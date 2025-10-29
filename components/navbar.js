'use client'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { data: session, status } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Students', path: '/students' },
    { name: 'Achievements', path: '/achievements' },
  ]

  const mobileNavVariants = {
    open: { 
      opacity: 1,
      height: "auto",
      transition: { staggerChildren: 0.1 }
    },
    closed: { 
      opacity: 0,
      height: 0,
      transition: { staggerChildren: 0.1, staggerDirection: -1 }
    }
  }

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all ${scrolled ? 'bg-[#234362]/95 py-2' : 'bg-[#234362]/90 py-3'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
              alt='Icon Invizone'
              src="/invizone.webp"
              width="250"
              height="250"
              ></Image>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-3 py-2 text-sm ${pathname === item.path ? 'text-white' : 'text-gray-300 hover:text-white'}`}
              >
                {item.name}
                {pathname === item.path && (
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                    layoutId="underline"
                    transition={{ type: 'spring' }}
                  />
                )}
              </Link>
            ))}
            
            {/* Auth Section */}
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-white/20">
              {status === 'loading' ? (
                <div className="w-8 h-8 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
              ) : session ? (
                <div className="flex items-center space-x-3">
                  {session.user.role === 'ADMIN' && (
                    <Link
                      href="/admin/dashboard"
                      className="px-3 py-1 bg-white/10 text-white text-sm rounded-full hover:bg-white/20 transition"
                    >
                      Dashboard
                    </Link>
                  )}
                  <div className="flex items-center space-x-2">
                    <Image
                      src={session.user.image || '/gambar.webp'}
                      alt={session.user.name || 'User'}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-white text-sm">{session.user.name || session.user.username}</span>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-full transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 text-white hover:text-gray-200 text-sm"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-4 py-2 bg-white text-[#234362] rounded-full text-sm font-medium hover:bg-gray-100 transition"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        <motion.div
          className="md:hidden overflow-hidden"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={mobileNavVariants}
        >
          <div className="pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 20 } }}
              >
                <Link
                  href={item.path}
                  className={`block px-3 py-2 rounded ${pathname === item.path ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/10'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}