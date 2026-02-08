import { posts, Post } from '@/content/posts'

export type { Post }

export function usePosts() {
  return { posts, loading: false }
}

export function usePost(id: string | undefined) {
  const post = id ? posts.find((p) => p.id === id) ?? null : null
  return { post, loading: false }
}
