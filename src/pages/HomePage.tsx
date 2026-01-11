import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Supabase + React + Vite CRUD Template
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          A modern full-stack template with TypeScript, Tailwind CSS, and more
        </p>
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
        >
          Get Started
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            🚀 Features
          </h3>
          <ul className="text-gray-600 dark:text-gray-400 space-y-2">
            <li>✅ TypeScript for type safety</li>
            <li>✅ Supabase authentication</li>
            <li>✅ React Router for navigation</li>
            <li>✅ Tailwind CSS for styling</li>
            <li>✅ Zustand for state management</li>
            <li>✅ Generic CRUD operations</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            📚 Getting Started
          </h3>
          <ol className="text-gray-600 dark:text-gray-400 space-y-2">
            <li>1. Set up your Supabase project</li>
            <li>2. Configure environment variables</li>
            <li>3. Run the development server</li>
            <li>4. Start building your app</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
