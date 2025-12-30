'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [galleryImages, setGalleryImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/gallery')
        
        if (!response.ok) {
          throw new Error('Failed to fetch gallery images')
        }
        
        const data = await response.json()
        setGalleryImages(data)
      } catch (err) {
        console.error('Error fetching gallery images:', err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [])

  // Disable scroll when image modal is open
  useEffect(() => {
    if (selectedImage) {
      // Save current scroll position
      const scrollY = window.scrollY
      
      // Disable scroll on body
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      
      return () => {
        // Re-enable scroll
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        
        // Restore scroll position
        window.scrollTo(0, scrollY)
      }
    }
  }, [selectedImage])

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category?.toUpperCase() === activeCategory.toUpperCase())

  const categories = ['all', 'CLASS', 'EVENTS', 'TRIPS', 'ACHIEVEMENTS']

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[#234362] mb-4">Class Gallery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Memories from our journey together
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map(category => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full capitalize text-sm font-medium ${
                activeCategory === category 
                  ? 'bg-[#234362] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-medium text-red-600 mb-2">Error Loading Gallery</h3>
            <p className="text-gray-500">{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square overflow-hidden rounded-xl shadow-md cursor-pointer group"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-white text-sm font-semibold drop-shadow-lg">
                    {image.title}
                  </span>
                  {image.description && (
                    <span className="text-white/80 text-xs mt-1 line-clamp-2 drop-shadow">
                      {image.description}
                    </span>
                  )}
                </div>
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                  {image.category}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && !error && filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white rounded-xl shadow-md"
          >
            <div className="text-5xl mb-4">📸</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              {activeCategory === 'all' ? 'No images yet' : 'No images in this category'}
            </h3>
            <p className="text-gray-500">Check back later for updates!</p>
          </motion.div>
        )}

        {/* Responsive Image Modal/Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(null)
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25 }}
                className="relative w-full h-full flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Responsive Image Container */}
                <div className="relative w-full h-full max-w-7xl max-h-[85vh] flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={selectedImage.src}
                      alt={selectedImage.title}
                      fill
                      className="object-contain rounded-lg"
                      sizes="100vw"
                      quality={95}
                      priority
                    />
                  </div>
                </div>

                {/* Image Info */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white"
                >
                  <div className="max-w-7xl mx-auto">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">
                      {selectedImage.title}
                    </h3>
                    {selectedImage.description && (
                      <p className="text-sm sm:text-base text-white/80 mb-2">
                        {selectedImage.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-white/60">
                      <span className="bg-white/10 px-2 py-1 rounded">
                        {selectedImage.category}
                      </span>
                      <span>
                        {new Date(selectedImage.createdAt).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}