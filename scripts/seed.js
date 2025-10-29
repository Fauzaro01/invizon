const { PrismaClient } = require('../lib/generated/prisma')

const prisma = new PrismaClient()

const studentsData = [
  // Teacher first
  {
    name: "Andi Sumantri",
    isTeacher: true,
    nip: "102001",
    subject: "Software Engineering",
    bio: "Education is the most powerful weapon which you can use to change the world.",
    avatar: "https://cdn3d.iconscout.com/3d/premium/thumb/geek-student-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--boy-man-avatar-pack-people-illustrations-4800738.png"
  },
  // Students
  {
    name: "Adhitya Naruzaky Putra",
    nis: "2324.5.001",
    quote: "Belajar hari ini adalah hadiah untuk dirimu di masa depan.",
    avatar: "/gambar.webp"
  },
  {
    name: "Adrian Maulana Rahman",
    nis: "2324.5.002",
    quote: "Pendidikan adalah cahaya yang menuntun langkah dalam gelapnya kebodohan.",
    avatar: "/gambar.webp"
  },
  {
    name: "Adrian Maulana Yusup",
    nis: "2324.5.003", 
    quote: "Setiap halaman yang kamu baca adalah langkah kecil menuju impianmu.",
    avatar: "/gambar.webp"
  },
  {
    name: "Ahmad Kin Hirufael",
    nis: "2324.5.004",
    quote: "Jangan takut salah saat belajar, takutlah jika berhenti mencoba.", 
    avatar: "/gambar.webp"
  },
  {
    name: "Ahmad Yaisy Ramdhani",
    nis: "2324.5.005",
    quote: "Ilmu bukan tentang siapa yang tercepat, tapi siapa yang tak berhenti berjalan.",
    avatar: "/gambar.webp"
  },
  {
    name: "Amelani Julianti",
    nis: "2324.5.006",
    quote: "Sekolah adalah tempat menanam harapan dan menuai masa depan.",
    avatar: "/gambar.webp"
  },
  {
    name: "Bartholomeus Immanuel Zebrian K",
    nis: "2324.5.007",
    quote: "Semangat belajar adalah bahan bakar untuk menembus batas kemampuanmu.",
    avatar: "/gambar.webp"
  },
  {
    name: "Dimas Bagus Prasetya",
    nis: "2324.5.008",
    quote: "Dengan belajar, kamu sedang membangun versi terbaik dari dirimu.",
    avatar: "/gambar.webp"
  },
  {
    name: "Divana Kayla Syafira",
    nis: "2324.5.009",
    quote: "Gagal dalam satu ujian bukan berarti gagal menjadi luar biasa.",
    avatar: "/gambar.webp"
  },
  {
    name: "Erna Eka Haryanti",
    nis: "2324.5.010", 
    quote: "Setiap pertanyaan yang kamu ajukan adalah tanda bahwa kamu sedang tumbuh.",
    avatar: "/gambar.webp"
  },
  {
    name: "Fahreza Mustafid Zayyan Fattan",
    nis: "2324.5.011",
    quote: "Waktu terbaik untuk belajar adalah saat kamu merasa malas melakukannya.",
    avatar: "/gambar.webp"
  },
  {
    name: "Fahrotunnida Mauludia",
    nis: "2324.5.012",
    quote: "Belajar bukan untuk jadi hebat dari orang lain, tapi untuk jadi lebih baik dari dirimu kemarin.",
    avatar: "/gambar.webp"
  },
  {
    name: "Faiza Bagas Wiryawan",
    nis: "2324.5.013",
    quote: "Satu ide yang kamu pelajari hari ini bisa mengubah seluruh hidupmu esok.",
    avatar: "/gambar.webp"
  },
  {
    name: "Hafis Ramadhan",
    nis: "2324.5.014",
    quote: "Tidak semua orang hebat pandai sejak lahir, mereka belajar tanpa henti.",
    avatar: "/gambar.webp"
  },
  {
    name: "Ida Efarina",
    nis: "2324.5.016",
    quote: "Buku adalah teman yang tak pernah mengecewakan.",
    avatar: "/gambar.webp"
  },
  {
    name: "Jesika Alfianda",
    nis: "2324.5.017", 
    quote: "Langkah kecil dalam belajar jauh lebih baik daripada tidak melangkah sama sekali.",
    avatar: "/gambar.webp"
  },
  {
    name: "Lia Ramahwati",
    nis: "2324.5.018",
    quote: "Semua orang pintar pernah duduk di bangku yang sama denganmu—bangku belajar.",
    avatar: "/gambar.webp"
  },
  {
    name: "Maulana Rivqi",
    nis: "2324.5.019",
    quote: "Belajar membuat kamu bebas memilih masa depanmu sendiri.", 
    avatar: "/gambar.webp"
  },
  {
    name: "Mila Latifah Zahra",
    nis: "2324.5.020",
    quote: "Mimpi besar hanya bisa dicapai dengan ilmu yang terus bertambah.",
    avatar: "/gambar.webp"
  },
  {
    name: "Muhamad Fauzaan",
    nis: "2324.5.021",
    quote: "Setiap pelajaran adalah bekal untuk menghadapi dunia nyata.",
    avatar: "/gambar.webp"
  },
  {
    name: "Nadin Pertiwi Jaliyanti",
    nis: "2324.5.023",
    quote: "Kegigihan dalam belajar lebih berharga daripada kepintaran tanpa usaha.",
    avatar: "/gambar.webp"
  },
  {
    name: "Rahmi Suci Oktaviani",
    nis: "2324.5.024",
    quote: "Bukan nilai yang menentukan masa depanmu, tapi kemauanmu untuk terus belajar.",
    avatar: "/gambar.webp"
  },
  {
    name: "Ratu Maura Erlangga",
    nis: "2324.5.026",
    quote: "Belajarlah, bahkan ketika tidak ada yang menyuruhmu.",
    avatar: "/gambar.webp"
  },
  {
    name: "Razy Mizan Muhammad Alby",
    nis: "2324.5.027",
    quote: "Ruang kelas adalah tempat di mana keajaiban kecil dimulai.",
    avatar: "/gambar.webp"
  },
  {
    name: "Salman Yusup Farisi",
    nis: "2324.5.028",
    quote: "Pendidikan mengubah kesulitan menjadi peluang.",
    avatar: "/gambar.webp"
  },
  {
    name: "Segara Banyu Bening",
    nis: "2324.5.029",
    quote: "Jangan tunggu pintar untuk belajar—belajarlah untuk menjadi pintar.",
    avatar: "/gambar.webp"
  },
  {
    name: "Sekar Rahayu",
    nis: "2324.5.030",
    quote: "Setiap kesulitan saat belajar akan membentuk kekuatan dalam hidupmu.",
    avatar: "/gambar.webp"
  },
  {
    name: "Sharliz Adina",
    nis: "2324.5.031",
    quote: "Belajar bukan tentang menjadi terbaik, tapi tentang menjadi siap.",
    avatar: "/gambar.webp"
  },
  {
    name: "Shaumi Awalliya Zahrina",
    nis: "2324.5.032", 
    quote: "Satu jam belajar hari ini bisa menyelamatkanmu dari ratusan jam kesulitan di masa depan.",
    avatar: "/gambar.webp"
  },
  {
    name: "Tristan Adriansyah",
    nis: "2324.5.033",
    quote: "Tidak semua pelajaran mudah, tapi semua pelajaran punya makna.",
    avatar: "/gambar.webp"
  },
  {
    name: "Verlyza Alliqeu Junofian",
    nis: "2324.5.034",
    quote: "Pendidikan tidak menjanjikan keberhasilan instan, tapi membuka jalan untuk mencapainya.",
    avatar: "/gambar.webp"
  },
  {
    name: "Vhika Azhara",
    nis: "2324.5.035",
    quote: "Jika kamu ingin mengubah dunia, mulailah dengan membuka buku.",
    avatar: "/gambar.webp"
  },
  {
    name: "Zakiyyah Ramadhani",
    nis: "2324.5.036", 
    quote: "Kedisiplinan dalam belajar adalah jembatan menuju keberhasilan.",
    avatar: "/gambar.webp"
  },
  {
    name: "Qurotu Aini",
    nis: "2324.5.073",
    quote: "Masa depanmu ditentukan oleh pilihan belajarmu hari ini.",
    avatar: "/gambar.webp"
  },
  {
    name: "Citra Chaeruny",
    nis: "2324.5.074",
    quote: "Belajar mengajarkan kita bahwa kita selalu bisa lebih baik.",
    avatar: "/gambar.webp"
  },
  {
    name: "Satria Dayanata Rizki",
    nis: "2324.5.075",
    quote: "Ilmu yang kamu pelajari adalah warisan terbaik yang tak akan pernah hilang.",
    avatar: "/gambar.webp"
  }
]

const galleryData = [
  {
    title: 'Hari Guru Kelas 10 Bersama Guru Jurusan',
    imageUrl: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305327/hariguru10_yzjyef.jpg',
    category: 'CLASS',
    description: 'Celebrating Teacher\'s Day with our beloved teachers'
  },
  {
    title: 'Hari Guru Kelas 10',
    imageUrl: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305329/hariguru10_2_hvusmw.jpg', 
    category: 'CLASS',
    description: 'Teacher\'s Day celebration with class 10'
  },
  {
    title: 'Bukber Kelas 10',
    imageUrl: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750319199/bukber2024_pzkzvk.jpg',
    category: 'TRIPS', 
    description: 'Breaking fast together - Class 10'
  },
  {
    title: 'ClassMeet kelas 11',
    imageUrl: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305326/classmeett11_bxu14n.jpg',
    category: 'EVENTS',
    description: 'Class competition event for grade 11'
  },
  {
    title: 'Hari Batik Kelas 11',
    imageUrl: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305329/haribatik11_hsskpd.jpg',
    category: 'CLASS',
    description: 'Celebrating Indonesian Batik Day'
  },
  {
    title: 'Upacara Kelas 11',
    imageUrl: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305332/upacara11_d4xp4p.jpg',
    category: 'CLASS', 
    description: 'Flag ceremony with grade 11'
  },
  {
    title: 'Ramadhan Berkah 2025',
    imageUrl: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305331/ramadhanberkah2025_uzyltx.jpg',
    category: 'EVENTS',
    description: 'Ramadan blessing event 2025'
  },
  {
    title: 'ClassMeet kelas 11 (Cowo)',
    imageUrl: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305264/classmeet11_ilqved.jpg',
    category: 'EVENTS',
    description: 'Boys team in class competition'
  }
]

const achievementsData = [
  {
    title: 'ClassMeet Mutu 2025',
    description: 'We Won the game Octopus Race and got the second place',
    year: 2025,
    date: new Date('2025-06-18'),
    imageUrl: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305264/classmeet11_ilqved.jpg',
    category: 'SPORTS',
    icon: '🐙🏃‍♂️'
  },
  {
    title: 'Karawang District LKS Competition Winners', 
    description: 'Our members won the web developer and graphic design competitions in one day',
    year: 2025,
    date: new Date('2025-04-16'),
    imageUrl: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305239/lks2024_srrvvf.jpg',
    category: 'ACADEMIC',
    icon: '💻'
  },
  {
    title: 'Mathematic OlmypicAD 2024',
    description: 'Tristan won the national Math Competition',
    year: 2024,
    date: new Date('2024-03-15'),
    imageUrl: 'https://res.cloudinary.com/dtzcamtgb/image/upload/v1750305239/olympicad2024_dgp9pj.jpg',
    category: 'ACADEMIC',
    icon: '🏅'
  },
  {
    title: 'Hari Pertama Sekolah: Awal dari Petualangan Baru!',
    description: 'Semua terasa asing, tapi juga penuh harapan. Hari itu jadi awal dari banyak cerita—tentang teman pertama, guru pertama, dan pelajaran tentang berani melangkah.',
    year: 2023,
    date: new Date('2023-07-16'),
    imageUrl: '/gambar.webp',
    category: 'MILESTONE',
    icon: '🚀'
  }
]

async function main() {
  console.log('🌱 Starting seed process...')

  try {
    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    await prisma.studentAchievement.deleteMany()
    await prisma.achievement.deleteMany()
    await prisma.gallery.deleteMany() 
    await prisma.comment.deleteMany()
    await prisma.post.deleteMany()
    await prisma.student.deleteMany()
    await prisma.teacher.deleteMany()
    await prisma.account.deleteMany()
    await prisma.session.deleteMany()
    await prisma.verificationToken.deleteMany()
    await prisma.user.deleteMany()

    console.log('👥 Seeding students and teacher...')

    // Seed students and teacher
    for (const studentData of studentsData) {
      if (studentData.isTeacher) {
        // Create teacher
        await prisma.teacher.create({
          data: {
            name: studentData.name,
            nip: studentData.nip,
            subject: studentData.subject,
            bio: studentData.bio,
            avatar: studentData.avatar
          }
        })
        console.log(`✅ Created teacher: ${studentData.name}`)
      } else {
        // Create student
        await prisma.student.create({
          data: {
            name: studentData.name,
            nis: studentData.nis,
            quote: studentData.quote,
            avatar: studentData.avatar
          }
        })
        console.log(`✅ Created student: ${studentData.name}`)
      }
    }

    console.log('🖼️  Seeding gallery images...')
    
    // Seed gallery
    for (const galleryItem of galleryData) {
      await prisma.gallery.create({
        data: {
          title: galleryItem.title,
          imageUrl: galleryItem.imageUrl,
          alt: galleryItem.title, // Use title as alt text
          category: galleryItem.category,
          description: galleryItem.description
        }
      })
      console.log(`✅ Created gallery item: ${galleryItem.title}`)
    }

    console.log('🏆 Seeding achievements...')
    
    // Seed achievements
    for (const achievementData of achievementsData) {
      await prisma.achievement.create({
        data: {
          title: achievementData.title,
          description: achievementData.description,
          year: achievementData.year,
          date: achievementData.date,
          imageUrl: achievementData.imageUrl,
          category: achievementData.category,
          icon: achievementData.icon
        }
      })
      console.log(`✅ Created achievement: ${achievementData.title}`)
    }

    console.log('📝 Seeding sample blog posts...')
    
    // Get an admin user to be the author (we need a real User for posts)
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    })
    
    if (adminUser) {
      const samplePosts = [
        {
          title: 'Welcome to Invizone Blog',
          content: '<p>Selamat datang di blog resmi Invizone! Di sini kami akan berbagi cerita, prestasi, dan aktivitas kelas yang menarik.</p><p>Mari bersama-sama membangun komunitas belajar yang inspiring dan amazing!</p>',
          category: 'announcement',
          imageUrl: '/hero.webp'
        },
        {
          title: 'Tips Belajar Efektif di Era Digital',
          content: '<p>Di era digital ini, cara belajar sudah banyak berubah. Berikut beberapa tips yang bisa membantu kalian:</p><ul><li>Gunakan aplikasi note-taking digital</li><li>Manfaatkan video pembelajaran online</li><li>Buat jadwal belajar yang terstruktur</li><li>Bergabung dengan study group virtual</li></ul>',
          category: 'education',
          imageUrl: '/gambar.webp'
        }
      ]

      for (const postData of samplePosts) {
        await prisma.post.create({
          data: {
            title: postData.title,
            content: postData.content,
            category: postData.category,
            imageUrl: postData.imageUrl,
            authorId: adminUser.id,
            published: true
          }
        })
        console.log(`✅ Created blog post: ${postData.title}`)
      }
    } else {
      console.log('⚠️  No admin user found, skipping blog posts seeding')
    }

    console.log('🎉 Seed completed successfully!')
    console.log(`📊 Summary:`)
    console.log(`   - Users: ${studentsData.length}`)
    console.log(`   - Students: ${studentsData.filter(s => !s.isTeacher).length}`) 
    console.log(`   - Teachers: ${studentsData.filter(s => s.isTeacher).length}`)
    console.log(`   - Gallery items: ${galleryData.length}`)
    console.log(`   - Achievements: ${achievementsData.length}`)
    console.log(`   - Blog posts: 2`)

  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })