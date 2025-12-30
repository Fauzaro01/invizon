"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const headerRef = useRef(null);
  const teachersRef = useRef(null);
  const studentsRef = useRef(null);

  // Fetch student details with achievements
  const fetchStudentDetails = async (studentId) => {
    setLoadingDetails(true);
    try {
      const response = await fetch(`/api/students/${studentId}`);
      if (!response.ok) throw new Error('Failed to fetch student details');
      const data = await response.json();
      setStudentDetails(data);
    } catch (err) {
      console.error('Error fetching student details:', err);
    } finally {
      setLoadingDetails(false);
    }
  };

  // Handle opening modal
  const openStudentProfile = (student) => {
    setSelectedStudent(student);
    fetchStudentDetails(student.id);
  };

  // Close modal and reset
  const closeModal = () => {
    setSelectedStudent(null);
    setStudentDetails(null);
  };

  // Close modal when clicking outside
  useEffect(() => {
    if (selectedStudent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedStudent]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/students');
        
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    if (!isLoading && students.length > 0) {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );
      }

      // Teachers section animation
      if (teachersRef.current && teachersRef.current.children.length > 0) {
        gsap.fromTo(
          teachersRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: teachersRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // Students cards animation
      if (studentsRef.current && studentsRef.current.children.length > 0) {
        gsap.fromTo(
          studentsRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: studentsRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    }

    // Cleanup ScrollTrigger on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoading, students]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>
                  <div className="h-20 bg-gray-200 rounded mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl p-12"
          >
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Data</h1>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-[#234362] text-white rounded-lg hover:bg-[#1a2f4a] transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  const teachers = students.filter((s) => s.isTeacher);
  const classStudents = students.filter((s) => !s.isTeacher);

  const handleShare = async () => {
    const shareText = `Check out ${selectedStudent.name}'s profile! They have ${studentDetails?.achievements?.length || 0} achievements. "${selectedStudent.quote || 'Dream big, work hard, stay humble'}"`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedStudent.name,
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${selectedStudent.name}\n${shareText}\n${window.location.href}`);
      alert('Profile link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#234362] mb-4">
            Our Class Members
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the amazing people of{" "}
            <span className="font-semibold text-[#234362]">Invizone</span>
          </p>
          <div className="mt-6 flex justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#234362] rounded-full"></div>
              <span>{teachers.length} {teachers.length === 1 ? 'Teacher' : 'Teachers'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>{classStudents.length} Students</span>
            </div>
          </div>
        </div>

        {/* Teachers Section */}
        {teachers.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#234362] mb-2">
                Our Mentors
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#234362] to-blue-500 mx-auto rounded-full"></div>
            </div>

            <div 
              ref={teachersRef}
              className={`grid gap-6 ${
                teachers.length === 1 
                  ? 'grid-cols-1 max-w-3xl mx-auto' 
                  : teachers.length === 2 
                  ? 'grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={teacher.avatar || '/gambar.webp'}
                      alt={teacher.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#234362]/95 via-[#234362]/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium mb-2">
                        👨‍🏫 Class Mentor
                      </div>
                      <h3 className="text-xl font-bold mb-1">{teacher.name}</h3>
                      <p className="text-xs text-white/80">{teacher.nis ? `NIP: ${teacher.nis}` : 'Teacher'}</p>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-gradient-to-br from-white to-gray-50">
                    {teacher.role && (
                      <div className="mb-3 pb-3 border-b border-gray-200">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                          Role
                        </div>
                        <div className="font-semibold text-[#234362] text-sm">
                          {teacher.role}
                        </div>
                      </div>
                    )}
                    
                    <div className="mb-3">
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                        Bio
                      </div>
                      <p className="text-gray-700 italic leading-relaxed text-sm line-clamp-2">
                        &quot;{teacher.quote || teacher.bio || 'Dedicated to student success'}&quot;
                      </p>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-gray-200">
                      <button className="flex-1 px-3 py-2 bg-[#234362] text-white rounded-lg hover:bg-[#1a2f4a] transition-colors font-medium text-xs">
                        Contact
                      </button>
                      <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-xs">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Students Section */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#234362] mb-2">
              Our Students
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div 
            ref={studentsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {classStudents.map((student, index) => (
              <div
                key={student.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <Image
                    src={student.avatar || '/gambar.webp'}
                    alt={student.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 right-3">
                    <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-sm font-bold text-[#234362]">
                      {index+1 || '00'}
                    </div>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#234362] transition-colors">
                    {student.name}
                  </h3>
                  <div className="text-sm text-gray-500 mb-3">
                    NIS: {student.nis}
                  </div>
                  
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm italic text-gray-600 line-clamp-3 leading-relaxed">
                      &quot;{student.quote || 'Dream big, work hard, stay humble'}&quot;
                    </p>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button 
                      onClick={() => openStudentProfile(student)}
                      className="flex-1 py-2 bg-gray-50 hover:bg-[#234362] hover:text-white text-gray-700 rounded-lg transition-all duration-300 text-xs font-medium"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Detail Modal */}
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.34, 1.56, 0.64, 1],
                type: "spring",
                stiffness: 100
              }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            >
              {/* Header with Image */}
              <div className="relative h-72 bg-gradient-to-br from-[#234362] via-[#2d4d6e] to-[#3a5a80] overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                    className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-2xl"
                  >
                    <Image
                      src={selectedStudent.avatar || '/gambar.webp'}
                      alt={selectedStudent.name}
                      fill
                      className="object-cover"
                      sizes="176px"
                      priority
                    />
                  </motion.div>
                </div>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-11 h-11 bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:scale-110 rounded-full flex items-center justify-center transition-all duration-200"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Name and Role */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="text-center mb-6"
                >
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">
                    {selectedStudent.name}
                  </h2>
                  <p className="text-gray-500">
                    {selectedStudent.role || 'Student'}
                  </p>
                </motion.div>

                {/* Info Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                  className="grid grid-cols-3 gap-4 mb-6"
                >
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1 font-semibold">
                      NIS
                    </div>
                    <div className="font-bold text-[#234362] text-lg">
                      {selectedStudent.nis}
                    </div>
                  </div>
                  {selectedStudent.no && (
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center">
                      <div className="text-xs text-purple-600 uppercase tracking-wider mb-1 font-semibold">
                        No. Absen
                      </div>
                      <div className="font-bold text-[#234362] text-lg">
                        #{selectedStudent.no}
                      </div>
                    </div>
                  )}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1 font-semibold">
                      Achievements
                    </div>
                    <div className="font-bold text-[#234362] text-lg">
                      {loadingDetails ? '...' : (studentDetails?.achievements?.length || 0)}
                    </div>
                  </div>
                </motion.div>

                {/* Quote Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="bg-gradient-to-br from-[#234362]/5 to-blue-50 rounded-xl p-6 mb-6 border border-[#234362]/10"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-4xl text-[#234362]/30 leading-none">
                      &ldquo;
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 italic leading-relaxed text-base">
                        {selectedStudent.quote || 'Dream big, work hard, stay humble'}
                      </p>
                      <div className="text-sm text-gray-500 mt-3 font-medium">
                        - {selectedStudent.name}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Achievements Section */}
                {loadingDetails ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="inline-block w-8 h-8 border-4 border-[#234362]/30 border-t-[#234362] rounded-full animate-spin"></div>
                    <p className="text-gray-500 mt-3">Loading achievements...</p>
                  </motion.div>
                ) : studentDetails?.achievements && studentDetails.achievements.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.3 }}
                    className="mb-6"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🏆</span>
                      Achievements & Awards
                    </h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                      {studentDetails.achievements.map((sa, index) => (
                        <motion.div
                          key={sa.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + (index * 0.05), duration: 0.3 }}
                          className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-lg flex items-center justify-center text-2xl">
                              {sa.achievement.icon || '🏆'}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-1">
                                {sa.achievement.title}
                              </h4>
                              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                {sa.achievement.description}
                              </p>
                              <div className="flex flex-wrap gap-2 text-xs">
                                {sa.position && (
                                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                                    {sa.position}
                                  </span>
                                )}
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                  {new Date(sa.earnedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                                {sa.achievement.category && (
                                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full capitalize">
                                    {sa.achievement.category}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.3 }}
                    className="text-center py-8 bg-gray-50 rounded-xl mb-6"
                  >
                    <div className="text-5xl mb-3">🎯</div>
                    <p className="text-gray-500">No achievements yet</p>
                    <p className="text-sm text-gray-400 mt-1">Keep working hard!</p>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="flex gap-3"
                >
                  <Link href={""} className="flex-1 py-3 bg-gradient-to-r from-[#234362] to-[#2d4d6e] text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 font-medium flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact
                  </Link>
                  <button onClick={() => handleShare(selectedStudent)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 hover:scale-[1.02] transition-all duration-200 font-medium flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
