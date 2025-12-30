'use client'
import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import ImageUpload from './ImageUpload'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import 'easymde/dist/easymde.min.css'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

export default function PostManagement() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [showPreview, setShowPreview] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    imageUrl: '',
    category: 'NEWS',
    isPublished: true
  })

  const editorOptions = useMemo(() => ({
    spellChecker: false,
    placeholder: 'Write your post content in markdown...',
    toolbar: [
      'bold', 'italic', 'heading', '|',
      'quote', 'code', 'table', '|',
      'unordered-list', 'ordered-list', '|',
      'link', 'image', '|',
      'preview', 'side-by-side', 'fullscreen', '|',
      'guide'
    ],
    status: ['lines', 'words', 'cursor'],
    autosave: {
      enabled: true,
      uniqueId: 'post-editor',
      delay: 1000,
    },
    renderingConfig: {
      singleLineBreaks: false,
      codeSyntaxHighlighting: true,
    }
  }), [])

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
    
    if (!session?.user?.id) {
      alert('You must be logged in to create posts')
      return
    }

    setIsLoading(true)

    try {
      const url = editingItem 
        ? `/api/posts/${editingItem.id}`
        : '/api/posts'
      
      const method = editingItem ? 'PUT' : 'POST'

      // Add authorId to formData
      const postData = {
        ...formData,
        authorId: session.user.id
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
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
      imageUrl: item.imageUrl || '',
      category: item.category || 'NEWS',
      isPublished: item.isPublished !== undefined ? item.isPublished : true
    })
    setShowAddForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      imageUrl: '',
      category: 'NEWS',
      isPublished: true
    })
    setEditingItem(null)
    setShowAddForm(false)
  }

  const handleImageUpload = (url) => {
    setFormData(prev => ({ ...prev, imageUrl: url || '' }))
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
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
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#234362] focus:border-transparent"
                    required
                  >
                    <option value="NEWS">News</option>
                    <option value="EVENTS">Events</option>
                    <option value="ACHIEVEMENTS">Achievements</option>
                    <option value="ANNOUNCEMENTS">Announcements</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.isPublished ? 'published' : 'draft'}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.value === 'published' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#234362] focus:border-transparent"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
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
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Content (Markdown)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    {showPreview ? '✏️ Edit' : '👁️ Preview'}
                  </button>
                </div>
                
                {!showPreview ? (
                  <SimpleMDE
                    value={formData.content}
                    onChange={(value) => setFormData({ ...formData, content: value })}
                    options={editorOptions}
                  />
                ) : (
                  <div className="border border-gray-300 rounded-lg p-6 min-h-[400px] bg-white prose prose-blue max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      components={{
                        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-5 mb-3" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
                        p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                        blockquote: ({ node, ...props }) => (
                          <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600" {...props} />
                        ),
                        code: ({ node, inline, ...props }) => 
                          inline ? (
                            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-red-600" {...props} />
                          ) : (
                            <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4" {...props} />
                          ),
                        a: ({ node, ...props }) => <a className="text-blue-600 hover:text-blue-800 underline" {...props} />,
                        img: ({ node, ...props }) => <img className="rounded-lg my-4 shadow-md max-w-full" {...props} />,
                        table: ({ node, ...props }) => (
                          <div className="overflow-x-auto my-4">
                            <table className="min-w-full divide-y divide-gray-200 border" {...props} />
                          </div>
                        ),
                        thead: ({ node, ...props }) => <thead className="bg-gray-50" {...props} />,
                        th: ({ node, ...props }) => <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border" {...props} />,
                        td: ({ node, ...props }) => <td className="px-4 py-2 text-sm text-gray-700 border" {...props} />
                      }}
                    >
                      {formData.content || '*No content yet. Start writing in the editor!*'}
                    </ReactMarkdown>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image (Optional)
                </label>
                <ImageUpload
                  onUploadComplete={handleImageUpload}
                  currentImage={formData.imageUrl}
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
                  {post.imageUrl && post.imageUrl.trim() !== '' && (
                    <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-lg">{post.title}</h4>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded whitespace-nowrap">
                        {post.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      📅 {formatDate(post.createdAt)} · ✍️ {post.author?.name || 'Unknown'}
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