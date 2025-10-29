import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth"

// Get server session
export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user
}

// Check if current user is admin
export async function requireAdmin() {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    throw new Error("Admin access required")
  }
  return user
}

// Check if user is authenticated
export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Authentication required")
  }
  return user
}

// Get user role
export function getUserRole(user) {
  return user?.role || null
}

// Check permissions
export function hasPermission(user, permission) {
  if (!user) return false
  
  switch (permission) {
    case "comment":
      return user.role === "USER" || user.role === "ADMIN"
    case "manage_all":
      return user.role === "ADMIN"
    case "manage_students":
    case "manage_posts":
    case "manage_teachers":
    case "manage_achievements":
    case "manage_gallery":
      return user.role === "ADMIN"
    default:
      return false
  }
}