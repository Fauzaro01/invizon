'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'], {
    clamp: false
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5])

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section 
      ref={heroRef}
      className="relative h-screen max-h-[800px] overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <Image 
          src="/hero.webp"
          alt="Invizone Class Photo"
          fill
          className="object-cover"
          priority
          quality={100}
          sizes="100vw"
        />
      </motion.div>

      <motion.div 
        className="absolute inset-0 bg-black/20"
        style={{ opacity }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div 
          className="bg-white/20 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/30 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0.7]),
            scale: useTransform(scrollYProgress, [0, 0.3], [1, 0.98])
          }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Invizone Class
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white mb-8 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            SMKS TI Muhammadiyah 1 Cikampek
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button className="bg-[#234362] hover:bg-[#1a3450] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Explore Our Journey
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}