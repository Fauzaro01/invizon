'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '@/components/Footer'

export default function AchievementsPage() {
  const [activeYear, setActiveYear] = useState(2023)
  const [isLoading, setIsLoading] = useState(false)
  const [achievementsData, setAchievementsData] = useState({})
  const [error, setError] = useState(null)
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setInitialLoading(true)
        const response = await fetch('/api/achievements')
        
        if (!response.ok) {
          throw new Error('Failed to fetch achievements')
        }
        
        const data = await response.json()
        setAchievementsData(data)
        
        // Set active year to the first available year
        const years = Object.keys(data).map(Number).sort()
        if (years.length > 0) {
          setActiveYear(years[years.length - 1]) // Most recent year
        }
      } catch (err) {
        console.error('Error fetching achievements:', err)
        setError(err.message)
      } finally {
        setInitialLoading(false)
      }
    }

    fetchAchievements()
  }, [])

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
              {initialLoading ? "Loading achievements..." : "Celebrating our milestones and successes together"}
            </p>
          </motion.div>

          {initialLoading && (
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col sm:flex-row">
                  <div className="flex-1 p-6 rounded-xl shadow-md bg-white animate-pulse">
                    <div className="flex items-start mb-4">
                      <div className="w-8 h-8 bg-gray-200 rounded mr-3"></div>
                      <div className="flex-1">
                        <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="h-20 bg-gray-200 rounded mb-4"></div>
                    <div className="h-48 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white rounded-xl shadow-md"
            >
              <div className="text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-medium text-red-600 mb-2">Error Loading Achievements</h3>
              <p className="text-gray-500">{error}</p>
            </motion.div>
          )}

          {!initialLoading && !error && (
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
                    whileTap={ { scale: 0.95 }}
                  >
                    {year}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {!initialLoading && !error && (
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
                  {achievementsData[activeYear] && achievementsData[activeYear].length > 0 ? (
                    achievementsData[activeYear].map((achievement, index) => (
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
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12 bg-white rounded-xl shadow-md"
                    >
                      <div className="text-5xl mb-4">🏆</div>
                      <h3 className="text-xl font-medium text-gray-700 mb-2">No achievements yet for {activeYear}</h3>
                      <p className="text-gray-500">Check back later for updates!</p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  )
}