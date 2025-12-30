'use client'
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  Instagram, 
  Github,
  Heart,
  ExternalLink
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => {
        setEmail('')
        setSubscribed(false)
      }, 3000)
    }
  }

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Achievements', href: '/achievements' },
    { name: 'Students', href: '/students' },
    { name: 'Blog', href: '/blog' }
  ]

  const socialLinks = [
    { 
      name: 'Instagram', 
      href: 'https://instagram.com/invizonee', 
      icon: Instagram,
      color: 'hover:bg-pink-600'
    },
    { 
      name: 'GitHub', 
      href: 'https://github.com/fauzaro01/invizone', 
      icon: Github,
      color: 'hover:bg-gray-700'
    }
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <Image
                  className="w-12 h-12 rounded-full bg-white ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300"
                  width={48}
                  height={48}
                  src="/invizone.webp"
                  alt="Invizone Icon"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Invizone
              </span>
            </Link>
            <p className="text-gray-400 mb-4 leading-relaxed">
              SMKS TI Muhammadiyah 1 Cikampek
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Building the future through technology, innovation, and Islamic values.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3 mt-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 ${social.color} group`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#234362]"></span>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#234362] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6 relative inline-block">
              Contact Info
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#234362]"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 text-[#234362] group-hover:scale-110 transition-transform" />
                <span className="text-gray-400 text-sm">
                  SMKS TI Muhammadiyah 1 Cikampek, West Java, Indonesia
                </span>
              </li>
              <li className="flex items-center group">
                <Phone className="w-5 h-5 mr-3 text-[#234362] group-hover:scale-110 transition-transform" />
                <a href="tel:+6285692517903" className="text-gray-400 hover:text-white transition-colors">
                  +62 856-9251-7903
                </a>
              </li>
              <li className="flex items-center group">
                <Mail className="w-5 h-5 mr-3 text-[#234362] group-hover:scale-110 transition-transform" />
                <a href="mailto:invizone@smkmutucikampek.sch.id" className="text-gray-400 hover:text-white transition-colors text-sm">
                  invizone@smkmutucikampek.sch.id
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6 relative inline-block">
              Stay Updated
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#234362]"></span>
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get the latest news and updates from Invizone Class.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#234362] focus:border-transparent transition-all"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#234362] hover:bg-[#1a3450] rounded-md transition-all duration-300 hover:scale-105"
                disabled={subscribed}
              >
                {subscribed ? (
                  <span className="text-xs px-2">✓</span>
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-400 text-sm mt-2"
              >
                Thanks for subscribing! 🎉
              </motion.p>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Invizone Class - SMKS TI Muhammadiyah 1 Cikampek. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>by Invizone Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}