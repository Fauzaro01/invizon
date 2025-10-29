import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { PrismaClient } from "./generated/prisma"

const prisma = new PrismaClient()

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true, // Allow linking accounts with same email
    }),
    
    // Username/Password Provider
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username
          }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        }
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role
        token.username = user.username
      }
      return token
    },
    
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
        session.user.username = token.username
      }
      return session
    },
    
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Check if user already exists with this email
          const existingUser = await prisma.user.findUnique({
            where: {
              email: user.email
            },
            include: {
              accounts: true
            }
          })
          
          if (existingUser) {
            // Check if user already has Google account linked
            const hasGoogleAccount = existingUser.accounts.some(
              acc => acc.provider === "google"
            )
            
            if (!hasGoogleAccount) {
              // Email exists but no Google account linked
              // Store linking request in session
              const linkingToken = Math.random().toString(36).substring(2)
              
              // Store linking request temporarily (you might want to use Redis or database for production)
              global.pendingLinkRequests = global.pendingLinkRequests || new Map()
              global.pendingLinkRequests.set(linkingToken, {
                existingUserId: existingUser.id,
                newAccount: {
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  type: account.type,
                  access_token: account.access_token,
                  refresh_token: account.refresh_token,
                  expires_at: account.expires_at,
                },
                userInfo: {
                  email: user.email,
                  name: user.name,
                  image: user.image,
                },
                timestamp: Date.now()
              })
              
              // Redirect to linking confirmation page
              return `/auth/link-account?token=${linkingToken}`
            }
          } else {
            // Create new user for Google OAuth
            await prisma.user.create({
              data: {
                email: user.email,
                name: user.name,
                image: user.image,
                role: "USER",
                emailVerified: new Date(),
              }
            })
          }
          
          return true
        } catch (error) {
          console.error("Error during Google sign in:", error)
          return false
        }
      }
      
      return true
    }
  },
  
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  
  session: {
    strategy: "jwt",
  },
  
  secret: process.env.NEXTAUTH_SECRET,
}