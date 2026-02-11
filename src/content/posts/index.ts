export interface Post {
    id: string
    title: string
    date: string
    content: string
}

// Simple frontmatter parser (browser-compatible)
function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
    const lines = raw.split('\n')
    const data: Record<string, string> = {}
    let contentStart = 0

    if (lines[0]?.trim() === '---') {
        for (let i = 1; i < lines.length; i++) {
            if (lines[i]?.trim() === '---') {
                contentStart = i + 1
                break
            }
            const [key, ...valueParts] = lines[i].split(':')
            if (key) {
                data[key.trim()] = valueParts.join(':').trim()
            }
        }
    }

    return {
        data,
        content: lines.slice(contentStart).join('\n').trim(),
    }
}

// Import all .md files from posts folder
const postFiles = import.meta.glob<string>('/src/content/posts/md/*.md', {
    eager: true,
    query: '?raw',
    import: 'default',
})

export function getPosts(): Post[] {
    const posts: Post[] = []

    for (const [path, raw] of Object.entries(postFiles)) {
        const { data, content } = parseFrontmatter(raw)
        const filename = path.split('/').pop()?.replace('.md', '') || ''

        posts.push({
            id: filename,
            title: data.title || 'Untitled',
            date: data.date || '',
            content,
        })
    }

    return posts.sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(id: string): Post | null {
    const posts = getPosts()
    return posts.find((p) => p.id === id) ?? null
}
