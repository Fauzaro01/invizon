'use client'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { 
  Menu, 
  X, 
  LogOut, 
  User, 
  LayoutDashboard,
  ChevronDown 
} from 'lucide-react'

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
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Gallery', path: '/gallery', icon: '🖼️' },
    { name: 'Blog', path: '/blog', icon: '📝' },
    { name: 'Students', path: '/students', icon: '👨‍🎓' },
    { name: 'Achievements', path: '/achievements', icon: '🏆' },
  ]

  return (
    <>
      <motion.nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#234362] shadow-lg backdrop-blur-md py-2' 
            : 'bg-[#234362]/95 py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  className="w-11 h-11 rounded-full bg-white ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300"
                  alt='Icon Invizone'
                  src="/invizone.webp"
                  width={44}
                  height={44}
                />
              </div>
              <span className="hidden sm:block text-white font-bold text-lg tracking-wide">
                Invizone
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="relative group px-4 py-2"
                >
                  <span className={`text-sm font-medium transition-colors ${
                    pathname === item.path 
                      ? 'text-white' 
                      : 'text-gray-300 group-hover:text-white'
                  }`}>
                    {item.name}
                  </span>
                  {pathname === item.path && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                      layoutId="navbar-indicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Auth Section - Desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              {status === 'loading' ? (
                <div className="w-8 h-8 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
              ) : session ? (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="flex items-center space-x-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group">
                      <Image
                        src={session.user.image || '/gambar.webp'}
                        alt={session.user.name || 'User'}
                        width={32}
                        height={32}
                        className="rounded-full ring-2 ring-white/30 group-hover:ring-white/50 transition-all"
                      />
                      <span className="text-white text-sm font-medium max-w-[120px] truncate">
                        {session.user.name || session.user.username}
                      </span>
                      <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-white transition-transform group-data-[state=open]:rotate-180" />
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="min-w-[220px] bg-white rounded-lg shadow-xl border border-gray-200 p-1 z-50"
                      sideOffset={5}
                    >
                      <DropdownMenu.Item className="outline-none">
                        <div className="px-3 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {session.user.name || session.user.username}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {session.user.email}
                          </p>
                        </div>
                      </DropdownMenu.Item>

                      {session.user.role === 'ADMIN' && (
                        <DropdownMenu.Item className="outline-none" asChild>
                          <Link
                            href="/admin/dashboard"
                            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-[#234362]/10 rounded-md cursor-pointer transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Dashboard</span>
                          </Link>
                        </DropdownMenu.Item>
                      )}

                      <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />

                      <DropdownMenu.Item className="outline-none" asChild>
                        <button
                          onClick={() => signOut()}
                          className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md cursor-pointer transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </DropdownMenu.Item>

                      <DropdownMenu.Arrow className="fill-white" />
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/auth/login"
                    className="px-5 py-2 text-white hover:text-gray-200 text-sm font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-5 py-2 bg-white text-[#234362] rounded-full text-sm font-semibold hover:bg-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-white z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b bg-[#234362]">
                  <span className="text-white font-bold text-lg">Menu</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* User Info */}
                {session && (
                  <div className="p-4 bg-[#234362]/5 border-b">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={session.user.image || '/gambar.webp'}
                        alt={session.user.name || 'User'}
                        width={48}
                        height={48}
                        className="rounded-full ring-2 ring-[#234362]/20"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {session.user.name || session.user.username}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {session.user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto py-4">
                  <nav className="px-3 space-y-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          pathname === item.path
                            ? 'bg-[#234362] text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    ))}

                    {session?.user.role === 'ADMIN' && (
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="font-medium">Dashboard</span>
                      </Link>
                    )}
                  </nav>
                </div>

                {/* Auth Actions */}
                <div className="p-4 border-t bg-gray-50">
                  {session ? (
                    <button
                      onClick={() => {
                        signOut()
                        setIsOpen(false)
                      }}
                      className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        href="/auth/login"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center w-full px-4 py-3 border-2 border-[#234362] text-[#234362] rounded-lg font-medium hover:bg-[#234362]/5 transition-colors"
                      >
                        Login
                      </Link>
                      <Link
                        href="/auth/register"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center w-full px-4 py-3 bg-[#234362] text-white rounded-lg font-medium hover:bg-[#234362]/90 transition-colors"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}