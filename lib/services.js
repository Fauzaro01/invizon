import { PrismaClient } from "./generated/prisma"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

// User Management Functions
export class UserService {
  
  // Create new user with username/password
  static async createUser(userData) {
    const { username, email, password, name, role = "USER" } = userData
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        name,
        role,
      }
    })
    
    return user
  }
  
  // Create student profile linked to user
  static async createStudentProfile(userId, studentData) {
    const { nis, name, no, quote, avatar } = studentData
    
    const student = await prisma.student.create({
      data: {
        nis,
        name,
        no,
        quote,
        avatar: avatar || "/gambar.webp",
        userId,
      }
    })
    
    return student
  }
  
  // Get user with role
  static async getUserWithRole(userId) {
    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        student: true,
      }
    })
  }
}

// Permission System
export class PermissionService {
  
  // Check if user is admin
  static isAdmin(user) {
    return user?.role === "ADMIN"
  }
  
  // Check if user can manage resources
  static canManageResources(user) {
    return this.isAdmin(user)
  }
  
  // Check if user can comment
  static canComment(user) {
    return user?.role === "USER" || user?.role === "ADMIN"
  }
  
  // Check if user can manage specific resource
  static canManage(user, resourceType) {
    if (!this.isAdmin(user)) return false
    
    const allowedResources = ["student", "post", "teacher", "achievement", "gallery"]
    return allowedResources.includes(resourceType)
  }
}

// Resource Management (Admin Only)
export class AdminService {
  
  // Student Management
  static async createStudent(studentData) {
    return await prisma.student.create({
      data: studentData
    })
  }
  
  static async updateStudent(studentId, updateData) {
    return await prisma.student.update({
      where: { id: studentId },
      data: updateData
    })
  }
  
  static async deleteStudent(studentId) {
    return await prisma.student.delete({
      where: { id: studentId }
    })
  }
  
  // Post Management
  static async createPost(postData) {
    return await prisma.post.create({
      data: postData
    })
  }
  
  static async updatePost(postId, updateData) {
    return await prisma.post.update({
      where: { id: postId },
      data: updateData
    })
  }
  
  // Teacher Management
  static async createTeacher(teacherData) {
    return await prisma.teacher.create({
      data: teacherData
    })
  }
  
  // Achievement Management
  static async createAchievement(achievementData) {
    return await prisma.achievement.create({
      data: achievementData
    })
  }
  
  // Gallery Management
  static async createGalleryItem(galleryData) {
    return await prisma.gallery.create({
      data: galleryData
    })
  }
}

// Comment System (User functionality)
export class CommentService {
  
  // Create comment on post
  static async createComment(userId, postId, content, parentId = null) {
    return await prisma.comment.create({
      data: {
        content,
        authorId: userId,
        postId,
        parentId,
      },
      include: {
        author: {
          select: {
            name: true,
            username: true,
            image: true,
          }
        },
        replies: {
          include: {
            author: {
              select: {
                name: true,
                username: true,
                image: true,
              }
            }
          }
        }
      }
    })
  }
  
  // Get comments for a post
  static async getPostComments(postId) {
    return await prisma.comment.findMany({
      where: {
        postId,
        parentId: null, // Only top-level comments
        isActive: true,
      },
      include: {
        author: {
          select: {
            name: true,
            username: true,
            image: true,
          }
        },
        replies: {
          where: {
            isActive: true,
          },
          include: {
            author: {
              select: {
                name: true,
                username: true,
                image: true,
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
  
  // Update comment (only by author or admin)
  static async updateComment(commentId, userId, content, isAdmin = false) {
    const whereClause = isAdmin 
      ? { id: commentId }
      : { id: commentId, authorId: userId }
    
    return await prisma.comment.update({
      where: whereClause,
      data: { content }
    })
  }
  
  // Delete comment (soft delete)
  static async deleteComment(commentId, userId, isAdmin = false) {
    const whereClause = isAdmin 
      ? { id: commentId }
      : { id: commentId, authorId: userId }
    
    return await prisma.comment.update({
      where: whereClause,
      data: { isActive: false }
    })
  }
}

export { prisma }