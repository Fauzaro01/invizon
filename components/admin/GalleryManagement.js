'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import ImageUpload from './ImageUpload'

const CATEGORIES = ['CLASS', 'EVENTS', 'TRIPS', 'ACHIEVEMENTS']

export default function GalleryManagement() {
  const [gallery, setGallery] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    alt: '',
    description: '',
    imageUrl: '',
    category: 'CLASS'
  })

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const response = await fetch('/api/gallery')
      if (response.ok) {
        const data = await response.json()
        setGallery(Array.isArray(data) ? data : [])
      } else {
        setGallery([])
      }
    } catch (error) {
      console.error('Failed to fetch gallery:', error)
      setGallery([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = editingItem 
        ? `/api/gallery/${editingItem.id}`
        : '/api/gallery'
      
      const method = editingItem ? 'PUT' : 'POST'

      // For update (PUT), only include imageUrl if it was changed
      const payload = editingItem 
        ? {
            title: formData.title,
            alt: formData.alt,
            description: formData.description,
            category: formData.category,
            // Only include imageUrl if it's different from original
            ...(formData.imageUrl !== editingItem.imageUrl && { imageUrl: formData.imageUrl })
          }
        : formData // For new items, include everything

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        await fetchGallery()
        resetForm()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save')
      }
    } catch (error) {
      console.error('Failed to save:', error)
      alert('Failed to save gallery item')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchGallery()
      } else {
        alert('Failed to delete')
      }
    } catch (error) {
      console.error('Failed to delete:', error)
      alert('Failed to delete gallery item')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      alt: item.alt || item.title,
      description: item.description || '',
      imageUrl: item.imageUrl,
      category: item.category
    })
    setShowAddForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      alt: '',
      description: '',
      imageUrl: '',
      category: 'CLASS'
    })
    setEditingItem(null)
    setShowAddForm(false)
  }

  const handleImageUpload = (url) => {
    setFormData(prev => ({ ...prev, imageUrl: url || '' }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gallery Management</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-[#234362] text-white rounded-lg hover:bg-[#1a2f4a] transition-colors"
        >
          + Add Gallery Item
        </motion.button>
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h4 className="text-lg font-semibold mb-4">
              {editingItem ? 'Edit' : 'Add'} Gallery Item
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#234362] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={formData.alt}
                    onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#234362] focus:border-transparent"
                    placeholder="Image description for accessibility"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#234362] focus:border-transparent"
                  required
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#234362] focus:border-transparent"
                  rows="3"
                  placeholder="Optional description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image {editingItem && <span className="text-gray-500 text-xs">(Optional - leave empty to keep current image)</span>}
                </label>
                <ImageUpload
                  onUploadComplete={handleImageUpload}
                  currentImage={formData.imageUrl}
                  folder="invizone/gallery"
                  required={!editingItem}
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={isLoading || (!editingItem && !formData.imageUrl)}
                  className="flex-1 px-4 py-2 bg-[#234362] text-white rounded-lg hover:bg-[#1a2f4a] transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : editingItem ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Grid */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {isLoading && !showAddForm ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#234362]"></div>
          </div>
        ) : gallery.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No gallery items found. Click the button above to add one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-48 bg-gray-200">
                  {item.src && item.src.trim() !== '' ? (
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs font-medium">
                    {item.category}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  {item.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                  )}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}