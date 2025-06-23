'use client';
// components/Gallery.tsx
import { useState } from 'react'
import Image from 'next/image'

export default function Gallery() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const galleryImages = [
    { src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305332/upacara11_d4xp4p.jpg', alt: 'Upacara Kelas 11' },
    { src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305329/hariguru10_2_hvusmw.jpg', alt: 'Hari Guru Kelas 10' },
    { src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305327/hariguru10_yzjyef.jpg', alt: 'Hari Guru Kelas 10 Bersama Guru Jurusan' },
    { src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305331/ramadhanberkah2025_uzyltx.jpg', alt: 'Ramadhan Berkah 2025' },
    { src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305326/classmeett11_bxu14n.jpg', alt: 'ClassMeet kelas 11' },
    { src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305325/ciwi_sbulmj.jpg', alt: "Velyza's Birthday Celebration" },
    { src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305329/haribatik11_hsskpd.jpg', alt: 'Hari Batik Kelas 11' },
    { src: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750319199/bukber2024_pzkzvk.jpg', alt: 'Bukber kelas 10' },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#234362] mb-4">Our Memories</h2>
          <div className="w-24 h-1 bg-[#234362] mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((img, index) => (
            <div 
              key={index}
              className="relative aspect-square overflow-hidden rounded-xl cursor-pointer hover:shadow-lg transition-all duration-300 group"
              onClick={() => {
                setCurrentSlide(index)
                setLightboxOpen(true)
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button 
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white text-4xl z-50"
          >
            &times;
          </button>
          
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={galleryImages[currentSlide].src}
              alt={galleryImages[currentSlide].alt}
              fill
              className="object-contain"
            />
            
            <button 
              onClick={(e) => { e.stopPropagation(); prevSlide() }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={(e) => { e.stopPropagation(); nextSlide() }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <div className="absolute bottom-8 left-0 right-0 text-center text-white">
              {galleryImages[currentSlide].alt}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}