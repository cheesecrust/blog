import { useParams, Link } from 'react-router-dom'
import { usePost } from '@/hooks/usePosts'
import { marked } from 'marked'

export default function PostPage() {
  const { id } = useParams()
  const { post, loading } = usePost(id)

  if (loading) {
    return <p className="text-gray-500 dark:text-gray-400">불러오는 중...</p>
  }

  if (!post) {
    return (
      <div>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          글을 찾을 수 없습니다.
        </p>
        <Link
          to="/"
          className="text-gray-900 dark:text-white underline underline-offset-4"
        >
          목록으로
        </Link>
      </div>
    )
  }

  const html = marked(post.content)

  return (
    <article>
      <Link
        to="/"
        className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        &larr; 목록으로
      </Link>

      <header className="mt-8 mb-10">
        <time className="text-sm text-gray-500 dark:text-gray-400">
          {post.date}
        </time>
        <h1 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
          {post.title}
        </h1>
      </header>

      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  )
}
