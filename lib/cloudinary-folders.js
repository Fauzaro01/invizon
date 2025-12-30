// Cloudinary folder constants untuk konsistensi
export const CLOUDINARY_FOLDERS = {
  // Avatar folders
  STUDENTS: 'invizone/students',
  TEACHERS: 'invizone/teachers',
  
  // Content folders
  GALLERY: 'invizone/gallery',
  POSTS: 'invizone/posts',
  ACHIEVEMENTS: 'invizone/achievements',
  
  // Category-based gallery folders
  GALLERY_CLASS: 'invizone/gallery/class',
  GALLERY_EVENTS: 'invizone/gallery/events',
  GALLERY_TRIPS: 'invizone/gallery/trips',
  GALLERY_ACHIEVEMENTS: 'invizone/gallery/achievements',
  
  // Year-based folders
  getYearFolder: (type, year = new Date().getFullYear()) => 
    `invizone/${type}/${year}`,
  
  // Custom folder builder
  custom: (path) => `invizone/${path}`
}

// Usage examples:
// import { CLOUDINARY_FOLDERS } from '@/lib/cloudinary-folders'
// 
// <ImageUpload folder={CLOUDINARY_FOLDERS.STUDENTS} />
// <ImageUpload folder={CLOUDINARY_FOLDERS.getYearFolder('events', 2025)} />
// <ImageUpload folder={CLOUDINARY_FOLDERS.custom('videos/tutorials')} />
