'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const galleryImages = [
  { id: 1, src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305327/hariguru10_yzjyef.jpg', alt: 'Hari Guru Kelas 10 Bersama Guru Jurusan', category: 'class' },
  { id: 2, src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305329/hariguru10_2_hvusmw.jpg', alt: 'Hari Guru Kelas 10', category: 'class' },
  { id: 3, src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750319199/bukber2024_pzkzvk.jpg', alt: 'Bukber Kelas 10', category: 'trips' },
  { id: 4, src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305326/classmeett11_bxu14n.jpg', alt: 'ClassMeet kelas 11', category: 'events' },
  { id: 5, src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305329/haribatik11_hsskpd.jpg', alt: 'Hari Batik Kelas 11', category: 'class' },
  { id: 6, src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305332/upacara11_d4xp4p.jpg', alt: 'Upacara Kelas 11', category: 'class' },
  { id: 7, src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305331/ramadhanberkah2025_uzyltx.jpg', alt: 'Ramadhan Berkah 2025', category: 'events' },
  { id: 8, src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305264/classmeet11_ilqved.jpg', alt: 'ClassMeet kelas 11 (Cowo)', category: 'events' },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory)

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
          {['all', 'class', 'events', 'trips'].map(category => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full capitalize text-sm font-medium ${activeCategory === category ? 'bg-[#234362] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square overflow-hidden rounded-xl shadow-md cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-sm font-medium">{image.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative w-full max-w-4xl max-h-[90vh]"
                onClick={e => e.stopPropagation()}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="object-contain w-full h-full rounded-lg"
                />
                <button 
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                  onClick={() => setSelectedImage(null)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-0 right-0 text-center text-white px-4">
                  {selectedImage.alt}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}