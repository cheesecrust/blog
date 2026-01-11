import type { Item } from '@/types'

interface ItemListProps {
  items: Item[]
  loading: boolean
  onEdit: (item: Item) => void
  onDelete: (id: string) => void
}

export default function ItemList({ items, loading, onEdit, onDelete }: ItemListProps) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-lg text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-lg text-gray-600 dark:text-gray-400">
          No items found. Create your first item!
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {item.description}
                </p>
              )}
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Created: {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>

            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => onEdit(item)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
