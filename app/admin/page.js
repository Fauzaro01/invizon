'use client'
import { useState, useEffect } from 'react'
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '@/lib/firebase'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'news',
    imageUrl: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const [loginError, setLoginError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
        setShowLogin(false)
      } else {
        setIsAuthenticated(false)
        setShowLogin(true)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    
    try {
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      setShowLogin(false)
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Login error:', error)
      setLoginError('Invalid email or password')
    }
  }

  const handleSubmitPost = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess(false)

    try {
      const invizoneDocRef = doc(db, 'projects', 'invizone')
      const postsCollection = collection(invizoneDocRef, 'posts')
      
      await addDoc(postsCollection, {
        ...formData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })

      setSuccess(true)
      setFormData({
        title: '',
        content: '',
        category: 'news',
        imageUrl: ''
      })
    } catch (err) {
      console.error('Error adding post:', err)
      setError('Failed to add post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence>
          {showLogin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
              >
                <h2 className="text-2xl font-bold text-[#234362] mb-6 text-center">
                  Admin Login
                </h2>
                
                {loginError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {loginError}
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#234362]"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#234362]"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-[#234362] text-white rounded-md font-medium hover:bg-[#1a3450] transition-colors"
                  >
                    Login
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-[#234362] mb-6">Create New Post</h1>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                Post created successfully!
              </div>
            )}

            <form onSubmit={handleSubmitPost} className="bg-white shadow-md rounded-lg p-6">
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#234362]"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="content">
                  Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows="8"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#234362]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="category">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#234362]"
                    required
                  >
                    <option value="news">News</option>
                    <option value="events">Events</option>
                    <option value="achievements">Achievements</option>
                    <option value="announcements">Announcements</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="imageUrl">
                    Image URL
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#234362]"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 rounded-md text-white font-medium ${isSubmitting ? 'bg-[#234362]/70' : 'bg-[#234362] hover:bg-[#1a3450]'} transition-colors`}
                >
                  {isSubmitting ? 'Publishing...' : 'Publish Post'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  )
}