'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ChevronDown, Award, Users, TrendingUp } from 'lucide-react'

function Counter({ end, duration = 2, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    
    let startTime
    let animationFrame
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / (duration * 1000)
      
      if (progress < 1) {
        setCount(Math.floor(end * progress))
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function Hero() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <section 
      ref={heroRef}
      className="relative h-screen min-h-[700px] overflow-hidden"
    >
      {/* Parallax Background */}
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
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </motion.div>

      <motion.div 
        className="absolute inset-0 bg-[#234362]/20"
        style={{ opacity }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div 
          className="max-w-5xl mx-auto"
          style={{ opacity: contentOpacity, scale }}
        >
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6"
            >
              <span className="text-white/90 text-sm font-medium">Welcome to Our Digital Journey</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Invizone Class
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-4 font-light">
              SMKS TI Muhammadiyah 1 Cikampek
            </p>
            
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Empowering students through technology, innovation, and Islamic values
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              href="/students"
              className="group px-8 py-4 bg-white text-[#234362] rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2"
            >
              Meet Our Students
              <Users className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/achievements"
              className="group px-8 py-4 bg-[#234362]/80 backdrop-blur-sm text-white rounded-full font-semibold text-lg border-2 border-white/30 hover:bg-[#234362] transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2"
            >
              Our Achievements
              <Award className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </Link>
          </motion.div>

        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-white transition-colors cursor-pointer group"
          aria-label="Scroll down"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </div>
        </motion.button>
      </div>
    </section>
  )
}