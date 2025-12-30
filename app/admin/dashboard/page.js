'use client'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { redirect } from 'next/navigation'

// Import management components
import StudentTeacherManagement from '@/components/admin/StudentTeacherManagement'
import PostManagement from '@/components/admin/PostManagement'
import AchievementManagement from '@/components/admin/AchievementManagement'
import GalleryManagement from '@/components/admin/GalleryManagement'
import CommentManagement from '@/components/admin/CommentManagement'

const menuItems = [
  { id: 'overview', name: 'Overview', icon: '📊' },
  { id: 'students', name: 'Students & Teachers', icon: '👥' },
  { id: 'posts', name: 'Blog Posts', icon: '📝' },
  { id: 'comments', name: 'Comments', icon: '💬' },
  { id: 'achievements', name: 'Achievements', icon: '🏆' },
  { id: 'gallery', name: 'Gallery', icon: '📷' },
]

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({
    students: 0,
    posts: 0,
    teachers: 0,
    achievements: 0,
    gallery: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/auth/login')
    }
    if (status === 'authenticated') {
      if (session?.user?.role !== 'ADMIN') {
        redirect('/')
      }
      fetchStats()
    }
  }, [status, session])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex space-x-2">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                delay: i * 0.2
              }}
              className="w-3 h-3 bg-[#234362] rounded-full"
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl mr-3">🎓</div>
              <h1 className="text-xl font-bold text-gray-900">
                Invizone Admin
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                Welcome, {session?.user?.name || session?.user?.username}
              </div>
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2 sticky top-24">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-[#234362] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white p-6 rounded-xl shadow-sm border cursor-pointer"
                        onClick={() => setActiveTab('students')}
                      >
                        <div className="flex items-center">
                          <div className="text-3xl mr-4">👥</div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Students</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.students}</p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white p-6 rounded-xl shadow-sm border cursor-pointer"
                        onClick={() => setActiveTab('students')}
                      >
                        <div className="flex items-center">
                          <div className="text-3xl mr-4">👨‍🏫</div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Teachers</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.teachers}</p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white p-6 rounded-xl shadow-sm border cursor-pointer"
                        onClick={() => setActiveTab('posts')}
                      >
                        <div className="flex items-center">
                          <div className="text-3xl mr-4">📝</div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Posts</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.posts}</p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white p-6 rounded-xl shadow-sm border cursor-pointer"
                        onClick={() => setActiveTab('achievements')}
                      >
                        <div className="flex items-center">
                          <div className="text-3xl mr-4">🏆</div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Achievements</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.achievements}</p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white p-6 rounded-xl shadow-sm border cursor-pointer"
                        onClick={() => setActiveTab('gallery')}
                      >
                        <div className="flex items-center">
                          <div className="text-3xl mr-4">📷</div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Gallery</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.gallery}</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <button
                          onClick={() => setActiveTab('posts')}
                          className="p-4 text-left border border-gray-200 rounded-lg hover:border-[#234362] hover:bg-[#234362]/5 transition-colors"
                        >
                          <div className="text-lg mb-2">📝</div>
                          <h4 className="font-medium text-gray-900">Create New Post</h4>
                          <p className="text-sm text-gray-600">Add blog post or announcement</p>
                        </button>
                        
                        <button
                          onClick={() => setActiveTab('students')}
                          className="p-4 text-left border border-gray-200 rounded-lg hover:border-[#234362] hover:bg-[#234362]/5 transition-colors"
                        >
                          <div className="text-lg mb-2">👥</div>
                          <h4 className="font-medium text-gray-900">Add Student/Teacher</h4>
                          <p className="text-sm text-gray-600">Register new student or teacher</p>
                        </button>
                        
                        <button
                          onClick={() => setActiveTab('gallery')}
                          className="p-4 text-left border border-gray-200 rounded-lg hover:border-[#234362] hover:bg-[#234362]/5 transition-colors"
                        >
                          <div className="text-lg mb-2">📷</div>
                          <h4 className="font-medium text-gray-900">Upload Photos</h4>
                          <p className="text-sm text-gray-600">Add to gallery</p>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'students' && <StudentTeacherManagement />}
                {activeTab === 'posts' && <PostManagement />}
                {activeTab === 'comments' && <CommentManagement />}
                {activeTab === 'achievements' && <AchievementManagement />}
                {activeTab === 'gallery' && <GalleryManagement />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}