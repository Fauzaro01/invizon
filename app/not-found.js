'use client';
import Link from 'next/link'
import { motion } from 'framer-motion'
import Head from 'next/head';

export default function NotFoundPage() {
  return (<>
    <Head>
      <title>Page Not Found | Invizone Class</title>
      <meta name="description" content="The page you're looking for doesn't exist or has been moved." />
      <meta name="robots" content="noindex, follow" />
    </Head>
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-[#234362] text-9xl font-bold mb-4"
        >
          404
        </motion.div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Here are some helpful links instead:
        </p>
        
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/"
            className="px-6 py-3 bg-[#234362] text-white rounded-lg font-medium hover:bg-[#1a3450] transition-colors shadow-md"
          >
            Return Home
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 bg-white text-[#234362] border border-[#234362] rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-md"
          >
            Visit Our Blog
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </>
  )
}