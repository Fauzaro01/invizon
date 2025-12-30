'use client';
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, Image as ImageIcon } from 'lucide-react'

export default function Gallery() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')

  const galleryImages = [
    { src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305332/upacara11_d4xp4p.jpg', alt: 'Upacara Kelas 11', category: 'ceremony' },
    { src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305329/hariguru10_2_hvusmw.jpg', alt: 'Hari Guru Kelas 10', category: 'celebration' },
    { src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305327/hariguru10_yzjyef.jpg', alt: 'Hari Guru Kelas 10 Bersama Guru Jurusan', category: 'celebration' },
    { src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305331/ramadhanberkah2025_uzyltx.jpg', alt: 'Ramadhan Berkah 2025', category: 'religious' },
    { src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305326/classmeett11_bxu14n.jpg', alt: 'ClassMeet kelas 11', category: 'sports' },
    { src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305325/ciwi_sbulmj.jpg', alt: "Velyza's Birthday Celebration", category: 'celebration' },
    { src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305329/haribatik11_hsskpd.jpg', alt: 'Hari Batik Kelas 11', category: 'culture' },
    { src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750319199/bukber2024_pzkzvk.jpg', alt: 'Bukber kelas 10', category: 'religious' },
  ]

  const categories = [
    { id: 'all', label: 'All Photos', icon: '🖼️' },
    { id: 'ceremony', label: 'Ceremonies', icon: '🎖️' },
    { id: 'celebration', label: 'Celebrations', icon: '🎉' },
    { id: 'religious', label: 'Religious', icon: '🕌' },
    { id: 'sports', label: 'Sports', icon: '⚽' },
    { id: 'culture', label: 'Culture', icon: '🎭' },
  ]

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1))
  }

  const openLightbox = (index) => {
    setCurrentSlide(index)
    setLightboxOpen(true)
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#234362]/10 rounded-full mb-4">
            <ImageIcon className="w-4 h-4 text-[#234362]" />
            <span className="text-[#234362] font-medium text-sm">Gallery</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#234362] mb-4">
            Our Memories
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Capturing precious moments and achievements throughout our journey
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                activeFilter === category.id
                  ? 'bg-[#234362] text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </motion.div>
        
        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFilter}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {filteredImages.map((img, index) => (
              <motion.div
                key={`${activeFilter}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer bg-white shadow-md hover:shadow-2xl transition-all duration-500"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-medium text-sm line-clamp-2">
                      {img.alt}
                    </p>
                  </div>
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100">
                  <ZoomIn className="w-5 h-5 text-[#234362]" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No photos found in this category</p>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-50 backdrop-blur-sm"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>
            
            {/* Image Counter */}
            <div className="absolute top-4 left-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              {currentSlide + 1} / {filteredImages.length}
            </div>

            {/* Main Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredImages[currentSlide].src}
                alt={filteredImages[currentSlide].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
              
              {/* Navigation Buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); prevSlide() }}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); nextSlide() }}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              {/* Caption */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-center"
              >
                <p className="text-white text-lg font-medium">
                  {filteredImages[currentSlide].alt}
                </p>
              </motion.div>
            </motion.div>

            {/* Keyboard Hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              Use arrow keys to navigate • Press ESC to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}