import { useState, useEffect, FormEvent } from 'react'
import type { Item } from '@/types'

interface ItemFormProps {
  item: Item | null
  onSubmit: (id: string, title: string, description: string) => Promise<void> | ((title: string, description: string) => Promise<void>)
  onCancel: () => void
}

export default function ItemForm({ item, onSubmit, onCancel }: ItemFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (item) {
      setTitle(item.title)
      setDescription(item.description || '')
    }
  }, [item])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (item) {
        await (onSubmit as (id: string, title: string, description: string) => Promise<void>)(item.id, title, description)
      } else {
        await (onSubmit as (title: string, description: string) => Promise<void>)(title, description)
      }
      setTitle('')
      setDescription('')
    } catch (err) {
      console.error('Error submitting form:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        {item ? 'Edit Item' : 'Create New Item'}
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            rows={4}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {loading ? 'Saving...' : item ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}
