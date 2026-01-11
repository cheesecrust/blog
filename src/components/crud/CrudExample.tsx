import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useCrud } from '@/hooks/useCrud'
import { useItemStore } from '@/stores/itemStore'
import type { Item } from '@/types'
import ItemForm from './ItemForm'
import ItemList from './ItemList'

export default function CrudExample() {
  const { user } = useAuth()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { selectedItem, setSelectedItem } = useItemStore()

  const { data: items, loading, error, create, update, remove } = useCrud<Item>({
    tableName: 'items',
    orderBy: 'created_at',
    ascending: false,
    filter: { user_id: user?.id },
  })

  const handleCreate = async (title: string, description: string) => {
    if (!user) return

    await create({
      title,
      description,
      user_id: user.id,
    })
    setIsFormOpen(false)
  }

  const handleUpdate = async (id: string, title: string, description: string) => {
    await update(id, { title, description })
    setSelectedItem(null)
    setIsFormOpen(false)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await remove(id)
    }
  }

  const handleEdit = (item: Item) => {
    setSelectedItem(item)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setSelectedItem(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Items
        </h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Item
        </button>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-4 rounded mb-4">
          Error: {error.message}
        </div>
      )}

      {isFormOpen && (
        <ItemForm
          item={selectedItem}
          onSubmit={selectedItem ? handleUpdate : handleCreate}
          onCancel={handleCloseForm}
        />
      )}

      <ItemList
        items={items}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
