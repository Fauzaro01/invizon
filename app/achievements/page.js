'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '@/components/Footer'

const achievementsData = {
  2025: [
    {
      id: 1,
      title: 'ClassMeet Mutu 2025',
      description: 'We Won the game Octopus Race and got the second place',
      date: 'June 18, 2025',
      image: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305264/classmeet11_ilqved.jpg',
      icon: '🐙🏃‍♂️'
    },
    {
      id: 2,
      title: 'Karawang District LKS Competition Winners',
      description: 'Our members won the web developer and graphic design competitions in one day',
      date: 'April 16, 2025',
      image: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305239/lks2024_srrvvf.jpg',
      icon: '💻'
    }
  ],
  2024: [
    {
      id: 3,
      title: 'Mathematic OlmypicAD 2024',
      description: 'Tristan won the national Math Competition',
      date: 'March 15, 2024',
      image: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305239/olympicad2024_dgp9pj.jpg',
      icon: '🏅'
    },
  ],
  2023: [
    {
      id: 4,
      title: 'Hari Pertama Sekolah: Awal dari Petualangan Baru!',
      description: 'Semua terasa asing, tapi juga penuh harapan. Hari itu jadi awal dari banyak cerita—tentang teman pertama, guru pertama, dan pelajaran tentang berani melangkah.',
      date: 'July 16, 2023',
      image: '/gambar.webp',
      icon: '🚀'
    },
  ]
}

export default function AchievementsPage() {
  const [activeYear, setActiveYear] = useState(2023)
  const [isLoading, setIsLoading] = useState(false)

  const handleYearChange = (year) => {
    setIsLoading(true)
    setActiveYear(year)
    setTimeout(() => setIsLoading(false), 500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center"
          >
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
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-[#234362] mb-4">
              Our Achievements
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Celebrating our milestones and successes together
            </p>
          </motion.div>

          <motion.div 
            className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex space-x-2 mx-auto">
              {Object.keys(achievementsData).map((year) => (
                <motion.button
                  key={year}
                  onClick={() => handleYearChange(Number(year))}
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeYear === Number(year) ? 'bg-[#234362] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {year}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 h-full w-0.5 bg-gray-200 transform -translate-x-1/2 hidden sm:block" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeYear}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 sm:space-y-12"
              >
                {achievementsData[activeYear].map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className={`relative flex flex-col sm:flex-row ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                  >
                    <div className="sm:hidden mb-2 text-sm text-gray-500">
                      {achievement.date}
                    </div>

                    <div className={`flex-1 p-6 rounded-xl shadow-md ${index % 2 === 0 ? 'sm:mr-8 bg-white' : 'sm:ml-8 bg-[#234362] text-white'}`}>
                      <div className="flex items-start mb-4">
                        <span className="text-2xl mr-3">{achievement.icon}</span>
                        <div>
                          <h3 className="text-xl font-bold">{achievement.title}</h3>
                          <div className={`text-sm mt-1 ${index % 2 === 0 ? 'text-gray-500' : 'text-gray-300'}`}>
                            {achievement.date}
                          </div>
                        </div>
                      </div>
                      <p className="mb-4">{achievement.description}</p>
                      
                      <div className="relative h-48 sm:h-56 rounded-lg overflow-hidden mt-4">
                        <Image
                          src={achievement.image}
                          alt={achievement.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 50vw"
                          placeholder="blur"
                          blurDataURL={`data:image/svg+xml;base64,...`}
                        />
                      </div>
                    </div>

                    <div className="hidden sm:flex flex-1 items-center justify-center px-4">
                      <div className={`p-3 rounded-full ${index % 2 === 0 ? 'bg-[#234362] text-white' : 'bg-white text-[#234362] border border-[#234362]'}`}>
                        {achievement.date}
                      </div>
                    </div>

                    <div className="hidden sm:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#234362] border-4 border-white shadow-lg flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}