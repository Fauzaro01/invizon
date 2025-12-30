'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import ImageUpload from './ImageUpload'

const CATEGORIES = ['ACADEMIC', 'SPORTS', 'ARTS', 'TECHNOLOGY', 'MILESTONE']
const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: 10 }, (_, i) => CURRENT_YEAR - i)

export default function AchievementManagement() {
  const [achievements, setAchievements] = useState([])
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'ACADEMIC',
    year: CURRENT_YEAR,
    studentIds: []
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [achievementsRes, studentsRes] = await Promise.all([
        fetch('/api/achievements'),
        fetch('/api/students')
      ])
      
      if (achievementsRes.ok) {
        const data = await achievementsRes.json()
        // API returns grouped by year object, flatten to array
        if (typeof data === 'object' && !Array.isArray(data)) {
          const flattenedAchievements = Object.values(data).flat()
          setAchievements(flattenedAchievements)
        } else {
          setAchievements(Array.isArray(data) ? data : [])
        }
      } else {
        setAchievements([])
      }
      
      if (studentsRes.ok) {
        const data = await studentsRes.json()
        setStudents(Array.isArray(data) ? data.filter(s => !s.isTeacher) : [])
      } else {
        setStudents([])
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
      setAchievements([])
      setStudents([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = editingItem 
        ? `/api/achievements/${editingItem.id}`
        : '/api/achievements'
      
      const method = editingItem ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchData()
        resetForm()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save')
      }
    } catch (error) {
      console.error('Failed to save:', error)
      alert('Failed to save achievement')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this achievement?')) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/achievements/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchData()
      } else {
        alert('Failed to delete')
      }
    } catch (error) {
      console.error('Failed to delete:', error)
      alert('Failed to delete achievement')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description || '',
      imageUrl: item.image || item.imageUrl || '',
      category: item.category || 'ACADEMIC',
      year: item.year,
      studentIds: item.students?.map(s => s.id) || []
    })
    setShowAddForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      category: 'ACADEMIC',
      year: CURRENT_YEAR,
      studentIds: []
    })
    setEditingItem(null)
    setShowAddForm(false)
  }

  const handleImageUpload = (url) => {
    setFormData(prev => ({ ...prev, imageUrl: url || '' }))
  }

  const toggleStudent = (studentId) => {
    setFormData(prev => ({
      ...prev,
      studentIds: prev.studentIds.includes(studentId)
        ? prev.studentIds.filter(id => id !== studentId)
        : [...prev.studentIds, studentId]
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Achievement Management</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-[#234362] text-white rounded-lg hover:bg-[#1a2f4a] transition-colors"
        >
          + Add Achievement
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
              {editingItem ? 'Edit' : 'Add'} Achievement
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    Year
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#234362] focus:border-transparent"
                    required
                  >
                    {YEARS.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
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
                  Image (Optional)
                </label>
                <ImageUpload
                  onUploadComplete={handleImageUpload}
                  currentImage={formData.imageUrl}
                  folder="invizone/achievements"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Associated Students (Optional)
                </label>
                <div className="border border-gray-300 rounded-lg p-3 max-h-48 overflow-y-auto">
                  {students.length === 0 ? (
                    <p className="text-sm text-gray-500">No students available</p>
                  ) : (
                    <div className="space-y-2">
                      {students.map(student => (
                        <label key={student.id} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                          <input
                            type="checkbox"
                            checked={formData.studentIds.includes(student.id)}
                            onChange={() => toggleStudent(student.id)}
                            className="rounded border-gray-300 text-[#234362] focus:ring-[#234362]"
                          />
                          <span className="text-sm">{student.name} ({student.nis})</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
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

      {/* Achievements List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {isLoading && !showAddForm ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#234362]"></div>
          </div>
        ) : achievements.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No achievements found. Click the button above to add one.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6">
            {achievements.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -2 }}
                className="bg-white rounded-lg shadow border p-4"
              >
                <div className="flex gap-4">
                  {(item.image || item.imageUrl) && (item.image?.trim() !== '' || item.imageUrl?.trim() !== '') && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{item.icon || '🏆'}</span>
                        <h4 className="font-semibold text-lg">{item.title}</h4>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{item.category || 'GENERAL'}</p>
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.description}</p>
                    )}
                    {item.date && (
                      <p className="text-xs text-gray-400 mt-1">📅 {item.date}</p>
                    )}
                    {item.students && item.students.length > 0 && (
                      <p className="text-xs text-gray-500 mt-2">
                        👥 {item.students.length} student{item.students.length > 1 ? 's' : ''} associated
                      </p>
                    )}
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-3 py-1 text-xs text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1 text-xs text-red-600 border border-red-600 rounded hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
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