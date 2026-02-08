import { getPosts, getPost, Post } from '@/content/posts'

export type { Post }

export function usePosts() {
  const posts = getPosts()
  return { posts, loading: false }
}

export function usePost(id: string | undefined) {
  const post = id ? getPost(id) : null
  return { post, loading: false }
}
