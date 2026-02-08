import matter from 'gray-matter'

export interface Post {
    id: string
    title: string
    date: string
    content: string
}

// Import all .md files from posts folder
const postFiles = import.meta.glob<string>('/src/content/posts/*.md', {
    eager: true,
    query: '?raw',
    import: 'default',
})

export function getPosts(): Post[] {
    const posts: Post[] = []

    for (const [path, raw] of Object.entries(postFiles)) {
        const { data, content } = matter(raw)
        const filename = path.split('/').pop()?.replace('.md', '') || ''

        posts.push({
            id: filename,
            title: data.title || 'Untitled',
            date: data.date || '',
            content: content.trim(),
        })
    }

    // Sort by date (newest first)
    return posts.sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(id: string): Post | null {
    const posts = getPosts()
    return posts.find((p) => p.id === id) ?? null
}
