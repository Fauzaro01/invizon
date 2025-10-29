'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const error = searchParams.get('error')

  const getErrorMessage = () => {
    switch (error) {
      case 'OAuthAccountNotLinked':
        return {
          title: 'Account Already Exists',
          message: 'An account with this email already exists. Please sign in with your existing account or try a different email.',
          suggestion: 'Try signing in with username/password if you have an existing account.'
        }
      case 'OAuthCreateAccount':
        return {
          title: 'Failed to Create Account',
          message: 'There was an error creating your account with Google.',
          suggestion: 'Please try again or contact support if the problem persists.'
        }
      case 'EmailCreateAccount':
        return {
          title: 'Email Account Creation Failed',
          message: 'Failed to create account with this email.',
          suggestion: 'Please try a different email or contact support.'
        }
      case 'Configuration':
        return {
          title: 'Configuration Error',
          message: 'There is a problem with the server configuration.',
          suggestion: 'Please contact support for assistance.'
        }
      default:
        return {
          title: 'Authentication Error',
          message: 'An unknown authentication error occurred.',
          suggestion: 'Please try again or contact support if the problem persists.'
        }
    }
  }

  const errorInfo = getErrorMessage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#234362] to-[#3a5a80] flex items-center justify-center px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <div className="mb-6">
          <Image
            src="/invizone.webp"
            alt="Invizone Logo"
            width={80}
            height={80}
            className="mx-auto rounded-full bg-gray-100 p-2 mb-4"
          />
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{errorInfo.title}</h1>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">{errorInfo.message}</p>
          <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
            💡 {errorInfo.suggestion}
          </p>
        </div>

        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/auth/login')}
            className="w-full py-3 px-4 bg-[#234362] text-white rounded-lg font-medium hover:bg-[#1a3450] transition-colors"
          >
            Try Again
          </motion.button>

          <Link
            href="/auth/register"
            className="block w-full py-3 px-4 border border-[#234362] text-[#234362] rounded-lg font-medium hover:bg-[#234362]/5 transition-colors"
          >
            Create New Account
          </Link>

          <Link
            href="/"
            className="block text-sm text-gray-500 hover:text-gray-700 mt-4"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Error Details for Debug */}
        {process.env.NODE_ENV === 'development' && error && (
          <div className="mt-6 p-3 bg-gray-100 rounded-lg text-left">
            <p className="text-xs text-gray-600">
              <strong>Debug Info:</strong><br />
              Error: {error}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}