'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function ImageUpload({ 
  onUploadComplete, 
  currentImage, 
  folder = 'invizone',
  acceptedTypes = 'image/*',
  maxSizeMB = 5 
}) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentImage || null)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > maxSizeMB) {
      setError(`File size must be less than ${maxSizeMB}MB`)
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)

    // Upload to Cloudinary
    await uploadFile(file)
  }

  const uploadFile = async (file) => {
    try {
      setUploading(true)
      setError(null)

      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Upload failed')
      }

      const data = await response.json()
      
      if (onUploadComplete) {
        onUploadComplete(data.url, data)
      }
    } catch (err) {
      console.error('Upload error:', err)
      setError(err.message)
      setPreview(currentImage)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    if (onUploadComplete) {
      onUploadComplete(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label 
          htmlFor="image-upload" 
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <AnimatePresence mode="wait">
            {preview ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full h-full"
              >
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-contain rounded-lg"
                />
                {!uploading && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      handleRemove()
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center pt-5 pb-6"
              >
                {uploading ? (
                  <>
                    <div className="flex space-x-2 mb-4">
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
                    <p className="text-sm text-gray-500">Uploading...</p>
                  </>
                ) : (
                  <>
                    <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to {maxSizeMB}MB</p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <input
            ref={fileInputRef}
            id="image-upload"
            type="file"
            className="hidden"
            accept={acceptedTypes}
            onChange={handleFileSelect}
            disabled={uploading}
          />
        </label>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-red-50 border border-red-200 rounded-lg"
        >
          <p className="text-sm text-red-600">{error}</p>
        </motion.div>
      )}
    </div>
  )
}