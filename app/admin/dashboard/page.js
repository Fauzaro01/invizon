'use client'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// Import components for each management section
import StudentManagement from '@/components/admin/StudentManagement'
import PostManagement from '@/components/admin/PostManagement'
import TeacherManagement from '@/components/admin/TeacherManagement'
import AchievementManagement from '@/components/admin/AchievementManagement'
import GalleryManagement from '@/components/admin/GalleryManagement'
import CommentManagement from '@/components/admin/CommentManagement'

const menuItems = [
  { id: 'overview', name: 'Overview', icon: '📊' },
  { id: 'students', name: 'Students', icon: '👥' },
  { id: 'posts', name: 'Posts', icon: '📝' },
  { id: 'teachers', name: 'Teachers', icon: '👨‍🏫' },
  { id: 'achievements', name: 'Achievements', icon: '🏆' },
  { id: 'gallery', name: 'Gallery', icon: '📷' },
  { id: 'comments', name: 'Comments', icon: '💬' },
]

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({
    students: 0,
    posts: 0,
    teachers: 0,
    achievements: 0,
    gallery: 0,
    comments: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'authenticated') {
      fetchStats()
    }
  }, [status])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      const data = await response.json()
      setStats(data)
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
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="/invizone.webp"
                alt="Invizone"
                width={40}
                height={40}
                className="rounded-full"
              />
              <h1 className="ml-3 text-xl font-bold text-gray-900">
                Admin Dashboard
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
            <nav className="space-y-2">
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
                      {Object.entries(stats).map(([key, value]) => {
                        const item = menuItems.find(m => m.id === key)
                        return (
                          <motion.div
                            key={key}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white p-6 rounded-xl shadow-sm border cursor-pointer"
                            onClick={() => setActiveTab(key)}
                          >
                            <div className="flex items-center">
                              <div className="text-3xl mr-4">{item?.icon}</div>
                              <div>
                                <p className="text-sm font-medium text-gray-600 capitalize">
                                  {key}
                                </p>
                                <p className="text-2xl font-bold text-gray-900">{value}</p>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
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
                          <h4 className="font-medium text-gray-900">Add Student</h4>
                          <p className="text-sm text-gray-600">Register new student</p>
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

                {activeTab === 'students' && <StudentManagement />}
                {activeTab === 'posts' && <PostManagement />}
                {activeTab === 'teachers' && <TeacherManagement />}
                {activeTab === 'achievements' && <AchievementManagement />}
                {activeTab === 'gallery' && <GalleryManagement />}
                {activeTab === 'comments' && <CommentManagement />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}