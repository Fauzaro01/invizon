'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import ImageUpload from './ImageUpload'

export default function StudentManagement() {
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [activeTab, setActiveTab] = useState('students') // 'students' or 'teachers'
  const [formData, setFormData] = useState({
    nis: '',
    name: '',
    quote: '',
    avatar: '/gambar.webp',
    isTeacher: false,
    subject: '',
    bio: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/students')
      if (response.ok) {
        const data = await response.json()
        const dataArray = Array.isArray(data) ? data : []
        setTeachers(dataArray.filter(s => s.isTeacher))
        setStudents(dataArray.filter(s => !s.isTeacher))
      } else {
        setTeachers([])
        setStudents([])
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
      setTeachers([])
      setStudents([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = editingStudent 
        ? `/api/students/${editingStudent.id}`
        : '/api/students'
      
      const method = editingStudent ? 'PUT' : 'POST'

      const payload = {
        name: formData.name,
        nis: formData.nis,
        avatar: formData.avatar,
        ...(formData.isTeacher ? {
          isTeacher: true,
          subject: formData.subject,
          bio: formData.bio || formData.quote
        } : {
          quote: formData.quote
        })
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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
      alert('Failed to save student/teacher')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this record?')) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchData()
      } else {
        alert('Failed to delete')
      }
    } catch (error) {
      console.error('Failed to delete:', error)
      alert('Failed to delete record')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (record) => {
    setEditingStudent(record)
    setFormData({
      nis: record.nis,
      name: record.name,
      quote: record.quote || '',
      avatar: record.avatar,
      isTeacher: record.isTeacher || false,
      subject: record.subject || '',
      bio: record.bio || record.quote || ''
    })
    setShowAddForm(true)
    setActiveTab(record.isTeacher ? 'teachers' : 'students')
  }

  const resetForm = () => {
    setFormData({
      nis: '',
      name: '',
      quote: '',
      avatar: '/gambar.webp',
      isTeacher: activeTab === 'teachers',
      subject: '',
      bio: ''
    })
    setEditingStudent(null)
    setShowAddForm(false)
  }

  const handleImageUpload = (url) => {
    setFormData(prev => ({ ...prev, avatar: url || '/gambar.webp' }))
  }

  const currentData = activeTab === 'students' ? students : teachers

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => {
            setActiveTab('students')
            resetForm()
          }}
          className={`px-4 py-2 font-medium ${activeTab === 'students' ? 'border-b-2 border-[#234362] text-[#234362]' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Students ({students.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('teachers')
            resetForm()
          }}
          className={`px-4 py-2 font-medium ${activeTab === 'teachers' ? 'border-b-2 border-[#234362] text-[#234362]' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Teachers ({teachers.length})
        </button>
      </div>

      {/* Add Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {activeTab === 'students' ? 'Student' : 'Teacher'} Management
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setFormData(prev => ({ ...prev, isTeacher: activeTab === 'teachers' }))
            setShowAddForm(true)
          }}
          className="px-4 py-2 bg-[#234362] text-white rounded-lg hover:bg-[#1a2f4a] transition-colors"
        >
          + Add {activeTab === 'students' ? 'Student' : 'Teacher'}
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
              {editingStudent ? 'Edit' : 'Add'} {activeTab === 'students' ? 'Student' : 'Teacher'}
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {activeTab === 'students' ? 'NIS' : 'NIP'}
                  </label>
                  <input
                    type="text"
                    value={formData.nis}
                    onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#234362] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#234362] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {activeTab === 'teachers' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#234362] focus:border-transparent"
                    placeholder="e.g., Software Engineering"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {activeTab === 'students' ? 'Quote' : 'Bio'}
                </label>
                <textarea
                  value={activeTab === 'students' ? formData.quote : formData.bio}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    [activeTab === 'students' ? 'quote' : 'bio']: e.target.value 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#234362] focus:border-transparent"
                  rows="3"
                  placeholder={activeTab === 'students' ? 'Motivational quote...' : 'Teacher bio...'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avatar Image
                </label>
                <ImageUpload
                  onUploadComplete={handleImageUpload}
                  currentImage={formData.avatar}
                  folder={`invizone/${activeTab}`}
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-[#234362] text-white rounded-lg hover:bg-[#1a2f4a] transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : editingStudent ? 'Update' : 'Add'}
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

      {/* List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {isLoading && !showAddForm ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#234362]"></div>
          </div>
        ) : currentData.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No {activeTab} found. Click the button above to add one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avatar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {activeTab === 'students' ? 'NIS' : 'NIP'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  {activeTab === 'teachers' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {activeTab === 'students' ? 'Quote' : 'Bio'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                        {record.avatar && record.avatar.trim() !== '' ? (
                          <Image
                            src={record.avatar}
                            alt={record.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            {record.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {record.nis}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {record.name}
                    </td>
                    {activeTab === 'teachers' && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {record.subject || '-'}
                      </td>
                    )}
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {record.quote || record.bio || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <button
                        onClick={() => handleEdit(record)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}