import { useAuth } from '@/contexts/AuthContext'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {user?.email}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          You're logged in!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          This is your dashboard. You can start building your application here.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Next steps:</strong> To add CRUD functionality, run the SQL script in <code>supabase-setup.sql</code> in your Supabase SQL Editor.
          </p>
        </div>
      </div>
    </div>
  )
}
