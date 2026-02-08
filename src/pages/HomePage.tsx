import { Link } from 'react-router-dom'
import { usePosts } from '@/hooks/usePosts'

export default function HomePage() {
  const { posts, loading } = usePosts()

  if (loading) {
    return <p className="text-gray-500 dark:text-gray-400">불러오는 중...</p>
  }

  return (
    <div>
      <div className="space-y-12">
        {posts.map((post) => (
          <article key={post.id}>
            <time className="text-sm text-gray-500 dark:text-gray-400">
              {post.date}
            </time>
            <h2 className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
              <Link
                to={`/post/${post.id}`}
                className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">
              {post.content.split('\n')[0]}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}
