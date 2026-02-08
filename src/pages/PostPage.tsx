import { useParams, Link } from 'react-router-dom'
import { usePost } from '@/hooks/usePosts'

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

      <div className="prose dark:prose-invert max-w-none">
        {post.content.split('\n').map((line, i) => {
          if (line.startsWith('## ')) {
            return (
              <h2
                key={i}
                className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4"
              >
                {line.replace('## ', '')}
              </h2>
            )
          }
          if (line.startsWith('- ')) {
            return (
              <li
                key={i}
                className="text-gray-700 dark:text-gray-300 ml-4"
                dangerouslySetInnerHTML={{
                  __html: line
                    .replace('- ', '')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                }}
              />
            )
          }
          if (line.trim() === '') {
            return <br key={i} />
          }
          return (
            <p
              key={i}
              className="text-gray-700 dark:text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
              }}
            />
          )
        })}
      </div>
    </article>
  )
}
