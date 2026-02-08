import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <header className="flex items-center justify-between mb-16">
          <Link to="/" className="text-3xl font-bold text-gray-900 dark:text-white">
            yan's blog
          </Link>
          <Link
            to="/about"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            about
          </Link>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
