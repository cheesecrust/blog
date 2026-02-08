import fs from 'fs'
import path from 'path'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const CHANGED_FILES = process.env.CHANGED_FILES?.split('\n').filter(Boolean) || []

if (!GEMINI_API_KEY) {
    console.log('⚠️ GEMINI_API_KEY not set, skipping AI processing')
    process.exit(0)
}

if (CHANGED_FILES.length === 0) {
    console.log('📝 No changed markdown files to process')
    process.exit(0)
}

// Simple frontmatter parser
function parseFrontmatter(content) {
    const lines = content.split('\n')
    const data = {}
    let contentStart = 0
    let hasFrontmatter = false

    if (lines[0]?.trim() === '---') {
        hasFrontmatter = true
        for (let i = 1; i < lines.length; i++) {
            if (lines[i]?.trim() === '---') {
                contentStart = i + 1
                break
            }
            const colonIndex = lines[i].indexOf(':')
            if (colonIndex > 0) {
                const key = lines[i].slice(0, colonIndex).trim()
                const value = lines[i].slice(colonIndex + 1).trim()
                data[key] = value
            }
        }
    }

    return {
        data,
        content: lines.slice(contentStart).join('\n').trim(),
        hasFrontmatter,
    }
}

// Generate frontmatter string
function generateFrontmatter(data) {
    const lines = ['---']
    for (const [key, value] of Object.entries(data)) {
        lines.push(`${key}: ${value}`)
    }
    lines.push('---')
    return lines.join('\n')
}

// Call Gemini API
async function callGemini(prompt) {
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.3,
                    maxOutputTokens: 8192,
                },
            }),
        }
    )

    const data = await response.json()
    return data.candidates?.[0]?.content?.parts?.[0]?.text || ''
}

// Process a single post
async function processPost(filePath) {
    console.log(`\n📄 Processing: ${filePath}`)

    const content = fs.readFileSync(filePath, 'utf-8')
    const { data, content: bodyContent, hasFrontmatter } = parseFrontmatter(content)

    // Skip if already processed (has 'processed' flag)
    if (data.processed === 'true') {
        console.log('  ✅ Already processed, skipping')
        return false
    }

    // Get today's date
    const today = new Date().toISOString().split('T')[0]

    // Generate title if missing
    if (!data.title) {
        const prompt = `다음 글의 제목을 한 줄로 짧게 만들어줘. 제목만 출력해. 따옴표 없이.

${bodyContent.slice(0, 500)}`

        const title = await callGemini(prompt)
        data.title = title.trim().replace(/^["']|["']$/g, '')
        console.log(`  📝 Generated title: ${data.title}`)
    }

    // Add date if missing
    if (!data.date) {
        data.date = today
        console.log(`  📅 Added date: ${data.date}`)
    }

    // Format content with AI
    console.log('  ✨ Formatting content with AI...')
    const formatPrompt = `다음 글을 읽기 좋게 마크다운으로 편집해줘.

규칙:
- 적절한 곳에 ## 소제목 추가
- 중요한 키워드는 **굵게**
- 목록이 적절한 곳은 - 리스트 사용
- 코드가 있으면 \`\`\` 코드블록 사용
- 원본 내용과 의미는 그대로 유지
- 마크다운 문법만 추가하고, 내용 자체를 바꾸지 마
- frontmatter(---로 시작하는 부분)는 출력하지 마, 본문만 출력해

글:
${bodyContent}`

    let formattedContent = await callGemini(formatPrompt)
    formattedContent = formattedContent.trim()

    // Remove any accidental frontmatter from AI response
    if (formattedContent.startsWith('---')) {
        const endIndex = formattedContent.indexOf('---', 3)
        if (endIndex > 0) {
            formattedContent = formattedContent.slice(endIndex + 3).trim()
        }
    }

    // Mark as processed
    data.processed = 'true'

    // Write updated file
    const newContent = `${generateFrontmatter(data)}\n\n${formattedContent}`
    fs.writeFileSync(filePath, newContent, 'utf-8')
    console.log('  ✅ Updated file')

    return true
}

// Main
async function main() {
    console.log('🤖 AI Post Processor Started')
    console.log(`📁 Files to process: ${CHANGED_FILES.length}`)

    let processed = 0

    for (const file of CHANGED_FILES) {
        if (!file.endsWith('.md')) continue
        if (!fs.existsSync(file)) {
            console.log(`⚠️ File not found: ${file}`)
            continue
        }

        try {
            const wasProcessed = await processPost(file)
            if (wasProcessed) processed++
        } catch (error) {
            console.error(`❌ Error processing ${file}:`, error.message)
        }
    }

    console.log(`\n✨ Done! Processed ${processed} file(s)`)
}

main().catch(console.error)
