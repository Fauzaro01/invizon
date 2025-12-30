'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import ImageUpload from './ImageUpload'

export default function PostManagement() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: ''
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const data = await response.json()
        setPosts(Array.isArray(data) ? data : [])
      } else {
        setPosts([])
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error)
      setPosts([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = editingItem 
        ? `/api/posts/${editingItem.id}`
        : '/api/posts'
      
      const method = editingItem ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchPosts()
        resetForm()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save')
      }
    } catch (error) {
      console.error('Failed to save:', error)
      alert('Failed to save post')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchPosts()
      } else {
        alert('Failed to delete')
      }
    } catch (error) {
      console.error('Failed to delete:', error)
      alert('Failed to delete post')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      content: item.content,
      excerpt: item.excerpt || '',
      featuredImage: item.featuredImage || ''
    })
    setShowAddForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      featuredImage: ''
    })
    setEditingItem(null)
    setShowAddForm(false)
  }

  const handleImageUpload = (url) => {
    setFormData(prev => ({ ...prev, featuredImage: url || '' }))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Post Management</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-[#234362] text-white rounded-lg hover:bg-[#1a2f4a] transition-colors"
        >
          + Add Post
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
              {editingItem ? 'Edit' : 'Add'} Post
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  Excerpt (Summary)
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#234362] focus:border-transparent"
                  rows="2"
                  placeholder="Brief summary of the post..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#234362] focus:border-transparent"
                  rows="10"
                  required
                  placeholder="Write your post content here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image (Optional)
                </label>
                <ImageUpload
                  onUploadComplete={handleImageUpload}
                  currentImage={formData.featuredImage}
                  folder="invizone/posts"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-[#234362] text-white rounded-lg hover:bg-[#1a2f4a] transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : editingItem ? 'Update' : 'Publish'}
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

      {/* Posts List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {isLoading && !showAddForm ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#234362]"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No posts found. Click the button above to add one.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {posts.map((post) => (
              <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex gap-4">
                  {post.featuredImage && post.featuredImage.trim() !== '' && (
                    <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-lg mb-1">{post.title}</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      {formatDate(post.createdAt)}
                    </p>
                    {post.excerpt && (
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{post.excerpt}</p>
                    )}
                    <p className="text-xs text-gray-500 mb-3">
                      {post.content.length} characters
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}