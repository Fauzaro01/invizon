'use client';
import Head from 'next/head';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Invizone Class",
    "url": "https://invizon.web.app",
    "logo": "https://invizon.web.app/invizone.webp",
    "description": "Official website of Invizone Class at SMKS TI Muhammadiyah 1 Cikampek",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cikampek",
      "addressRegion": "West Java",
      "addressCountry": "ID"
    }
  }

  return (
    <div className="min-h-screen">
      <Head>
        <title>Invizone - SMKS TI Muhammadiyah 1 Cikampek</title>
        <meta name="description" content="Official website of Invizone class" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero/>

      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#234362] mb-4">Our Class Identity</h2>
            <div className="w-24 h-1 bg-[#234362] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#234362] rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Vision</h3>
              <p className="text-gray-700 text-center">To become a generation that is intelligent, creative, and has noble character in the digital era.</p>
            </div>
            
            <div className="bg-gray-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#234362] rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Mission</h3>
              <p className="text-gray-700 text-center">Developing technological competence while maintaining religious values and social responsibility.</p>
            </div>
            
            <div className="bg-gray-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#234362] rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Values</h3>
              <p className="text-gray-700 text-center">Unity, Innovation, Integrity, and Excellence in all aspects of learning and personal development.</p>
            </div>
          </div>
        </div>
      </section>

      <Gallery/>

      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#234362] mb-4">Student Voices</h2>
            <div className="w-24 h-1 bg-[#234362] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#234362] rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Adrian Maulana Rahman</h4>
                  <p className="text-gray-600 text-sm">Ketua Kelas</p>
                </div>
              </div>
              <p className="text-gray-700 italic">&quot;Being part of Invizone has been an incredible journey of growth and learning. Our class is more than just a group - we&apos;re a family that supports each other.&quot;</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#234362] rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Ratu Maura </h4>
                  <p className="text-gray-600 text-sm">Wakil Ketua Kelas</p>
                </div>
              </div>
              <p className="text-gray-700 italic">&quot;The Invizone class represents the perfect balance between academic excellence and character building. I&apos;m proud to be part of this amazing class.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#234362] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to Know More About Us?</h2>
          <p className="text-xl mb-8 opacity-90">Connect with Invizone class and be part of our growing network.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-[#234362] font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition">
              Contact Us  
            </button>
            <Link href="https://instagram.com/invizonee" className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-[#234362] transition">
              Follow on Instagram
            </Link>
          </div>
        </div>
      </section>

      <Footer/>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}