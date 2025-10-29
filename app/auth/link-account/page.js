'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function LinkAccountPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  
  const [linkingData, setLinkingData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (token) {
      fetchLinkingData()
    } else {
      setError('Invalid linking token')
      setIsLoading(false)
    }
  }, [token])

  const fetchLinkingData = async () => {
    try {
      const response = await fetch(`/api/auth/link-account?token=${token}`)
      const data = await response.json()
      
      if (response.ok) {
        setLinkingData(data)
      } else {
        setError(data.message || 'Failed to fetch linking data')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLinkAccount = async () => {
    setIsProcessing(true)
    setError('')

    try {
      const response = await fetch('/api/auth/link-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          action: 'link'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Successfully linked, redirect to sign in with Google again
        router.push('/api/auth/signin/google')
      } else {
        setError(data.message || 'Failed to link accounts')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDeclineLink = async () => {
    setIsProcessing(true)

    try {
      await fetch('/api/auth/link-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          action: 'decline'
        }),
      })

      // Redirect back to login with suggestion to use different email
      router.push('/auth/login?error=EmailConflict')
    } catch (err) {
      setError('Something went wrong.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#234362] to-[#3a5a80] flex items-center justify-center px-4 sm:px-6">
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
              className="w-3 h-3 bg-white rounded-full"
            />
          ))}
        </div>
      </div>
    )
  }

  if (error || !linkingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#234362] to-[#3a5a80] flex items-center justify-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/auth/login"
            className="inline-block px-6 py-3 bg-[#234362] text-white rounded-lg font-medium hover:bg-[#1a3450] transition-colors"
          >
            Back to Login
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#234362] to-[#3a5a80] flex items-center justify-center px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <Image
            src="/invizone.webp"
            alt="Invizone Logo"
            width={80}
            height={80}
            className="mx-auto rounded-full bg-gray-100 p-2 mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Already Exists</h1>
          <p className="text-gray-600">We found an existing account with this email address</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-[#234362] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
              {linkingData.userInfo.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-medium text-gray-900">{linkingData.userInfo.name}</div>
              <div className="text-sm text-gray-600">{linkingData.userInfo.email}</div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Current sign-in method:</strong> Username/Password
            </p>
            <p className="text-sm text-gray-700">
              <strong>Attempting to link:</strong> Google Account
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">What would you like to do?</h3>
          <p className="text-sm text-gray-600 mb-4">
            You can link your Google account to your existing account for easier sign-in, or use a different Google account.
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        <div className="space-y-3">
          <motion.button
            onClick={handleLinkAccount}
            disabled={isProcessing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
              isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#234362] hover:bg-[#1a3450]'
            } transition-colors`}
          >
            {isProcessing ? 'Linking Accounts...' : '✓ Link Google Account'}
          </motion.button>

          <motion.button
            onClick={handleDeclineLink}
            disabled={isProcessing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Use Different Google Account
          </motion.button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-3">
            Already have access to this account?
          </p>
          <Link
            href="/auth/login"
            className="text-[#234362] hover:text-[#1a3450] text-sm font-medium"
          >
            Sign in with existing credentials
          </Link>
        </div>
      </motion.div>
    </div>
  )
}