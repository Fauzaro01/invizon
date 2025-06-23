"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const students = [
  {
    id: 1,
    nis: "102001",
    name: "Andi Sumantri",
    role: "Class Leader Teacher",
    quote:
      "Education is the most powerful weapon which you can use to change the world.",
    avatar: "https://cdn3d.iconscout.com/3d/premium/thumb/geek-student-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--boy-man-avatar-pack-people-illustrations-4800738.png",
    isTeacher: true,
  },
  {
    no: 2,
    name: "Adhitya Naruzaky Putra",
    nis: "2324.5.001",
    quote: "Belajar hari ini adalah hadiah untuk dirimu di masa depan.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 3,
    name: "Adrian Maulana Rahman",
    nis: "2324.5.002",
    quote:
      "Pendidikan adalah cahaya yang menuntun langkah dalam gelapnya kebodohan.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 4,
    name: "Adrian Maulana Yusup",
    nis: "2324.5.003",
    quote:
      "Setiap halaman yang kamu baca adalah langkah kecil menuju impianmu.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 5,
    name: "Ahmad Kin Hirufael",
    nis: "2324.5.004",
    quote: "Jangan takut salah saat belajar, takutlah jika berhenti mencoba.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 6,
    name: "Ahmad Yaisy Ramdhani",
    nis: "2324.5.005",
    quote:
      "Ilmu bukan tentang siapa yang tercepat, tapi siapa yang tak berhenti berjalan.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 7,
    name: "Amelani Julianti",
    nis: "2324.5.006",
    quote: "Sekolah adalah tempat menanam harapan dan menuai masa depan.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 8,
    name: "Bartholomeus Immanuel Zebrian K",
    nis: "2324.5.007",
    quote:
      "Semangat belajar adalah bahan bakar untuk menembus batas kemampuanmu.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 9,
    name: "Dimas Bagus Prasetya",
    nis: "2324.5.008",
    quote: "Dengan belajar, kamu sedang membangun versi terbaik dari dirimu.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 10,
    name: "Divana Kayla Syafira",
    nis: "2324.5.009",
    quote: "Gagal dalam satu ujian bukan berarti gagal menjadi luar biasa.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 11,
    name: "Erna Eka Haryanti",
    nis: "2324.5.010",
    quote:
      "Setiap pertanyaan yang kamu ajukan adalah tanda bahwa kamu sedang tumbuh.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 12,
    name: "Fahreza Mustafid Zayyan Fattan",
    nis: "2324.5.011",
    quote:
      "Waktu terbaik untuk belajar adalah saat kamu merasa malas melakukannya.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 13,
    name: "Fahrotunnida Mauludia",
    nis: "2324.5.012",
    quote:
      "Belajar bukan untuk jadi hebat dari orang lain, tapi untuk jadi lebih baik dari dirimu kemarin.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 14,
    name: "Faiza Bagas Wiryawan",
    nis: "2324.5.013",
    quote:
      "Satu ide yang kamu pelajari hari ini bisa mengubah seluruh hidupmu esok.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 15,
    name: "Hafis Ramadhan",
    nis: "2324.5.014",
    quote:
      "Tidak semua orang hebat pandai sejak lahir, mereka belajar tanpa henti.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 16,
    name: "Ida Efarina",
    nis: "2324.5.016",
    quote: "Buku adalah teman yang tak pernah mengecewakan.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 17,
    name: "Jesika Alfianda",
    nis: "2324.5.017",
    quote:
      "Langkah kecil dalam belajar jauh lebih baik daripada tidak melangkah sama sekali.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 18,
    name: "Lia Ramahwati",
    nis: "2324.5.018",
    quote:
      "Semua orang pintar pernah duduk di bangku yang sama denganmu—bangku belajar.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 19,
    name: "Maulana Rivqi",
    nis: "2324.5.019",
    quote: "Belajar membuat kamu bebas memilih masa depanmu sendiri.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 20,
    name: "Mila Latifah Zahra",
    nis: "2324.5.020",
    quote: "Mimpi besar hanya bisa dicapai dengan ilmu yang terus bertambah.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 21,
    name: "Muhamad Fauzaan",
    nis: "2324.5.021",
    quote: "Setiap pelajaran adalah bekal untuk menghadapi dunia nyata.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 22,
    name: "Nadin Pertiwi Jaliyanti",
    nis: "2324.5.023",
    quote:
      "Kegigihan dalam belajar lebih berharga daripada kepintaran tanpa usaha.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 23,
    name: "Rahmi Suci Oktaviani",
    nis: "2324.5.024",
    quote:
      "Bukan nilai yang menentukan masa depanmu, tapi kemauanmu untuk terus belajar.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 24,
    name: "Ratu Maura Erlangga",
    nis: "2324.5.026",
    quote: "Belajarlah, bahkan ketika tidak ada yang menyuruhmu.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 25,
    name: "Razy Mizan Muhammad Alby",
    nis: "2324.5.027",
    quote: "Ruang kelas adalah tempat di mana keajaiban kecil dimulai.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 26,
    name: "Salman Yusup Farisi",
    nis: "2324.5.028",
    quote: "Pendidikan mengubah kesulitan menjadi peluang.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 27,
    name: "Segara Banyu Bening",
    nis: "2324.5.029",
    quote:
      "Jangan tunggu pintar untuk belajar—belajarlah untuk menjadi pintar.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 28,
    name: "Sekar Rahayu",
    nis: "2324.5.030",
    quote:
      "Setiap kesulitan saat belajar akan membentuk kekuatan dalam hidupmu.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 29,
    name: "Sharliz Adina",
    nis: "2324.5.031",
    quote: "Belajar bukan tentang menjadi terbaik, tapi tentang menjadi siap.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 30,
    name: "Shaumi Awalliya Zahrina",
    nis: "2324.5.032",
    quote:
      "Satu jam belajar hari ini bisa menyelamatkanmu dari ratusan jam kesulitan di masa depan.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 31,
    name: "Tristan Adriansyah",
    nis: "2324.5.033",
    quote: "Tidak semua pelajaran mudah, tapi semua pelajaran punya makna.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 32,
    name: "Verlyza Alliqeu Junofian",
    nis: "2324.5.034",
    quote:
      "Pendidikan tidak menjanjikan keberhasilan instan, tapi membuka jalan untuk mencapainya.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 33,
    name: "Vhika Azhara",
    nis: "2324.5.035",
    quote: "Jika kamu ingin mengubah dunia, mulailah dengan membuka buku.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 34,
    name: "Zakiyyah Ramadhani",
    nis: "2324.5.036",
    quote: "Kedisiplinan dalam belajar adalah jembatan menuju keberhasilan.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 35,
    name: "Qurotu Aini",
    nis: "2324.5.073",
    quote: "Masa depanmu ditentukan oleh pilihan belajarmu hari ini.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 36,
    name: "Citra Chaeruny",
    nis: "2324.5.074",
    quote: "Belajar mengajarkan kita bahwa kita selalu bisa lebih baik.",
    avatar: "/gambar.webp",
    role: "Student",
  },
  {
    no: 37,
    name: "Satria Dayanata Rizki",
    nis: "2324.5.075",
    quote:
      "Ilmu yang kamu pelajari adalah warisan terbaik yang tak akan pernah hilang.",
    avatar: "/gambar.webp",
    role: "Student",
  },
];

export default function StudentsPage() {
  const teacher = students.find((s) => s.isTeacher);
  const classStudents = students.filter((s) => !s.isTeacher);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[#234362] mb-4">
            Our Class Members
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the amazing people of Invizone
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <div className="bg-gradient-to-r from-[#234362] to-[#3a5a80] rounded-2xl shadow-xl overflow-hidden max-w-2xl w-full">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 relative h-48 md:h-auto">
                <Image
                  src={teacher.avatar}
                  alt={teacher.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 md:w-2/3 text-white">
                <div className="text-sm font-medium mb-1">Class Leader</div>
                <h2 className="text-2xl font-bold mb-2">{teacher.name}</h2>
                <div className="text-sm mb-4">NIP: {teacher.nis}</div>
                <p className="italic">&quot;{teacher.quote}&quot;</p>
                <div className="mt-4 flex space-x-2">
                  <button className="px-4 py-2 bg-white/10 rounded-full text-sm hover:bg-white/20 transition">
                    Contact
                  </button>
                  <button className="px-4 py-2 bg-white/10 rounded-full text-sm hover:bg-white/20 transition">
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classStudents.map((student, index) => (
            <motion.div
              key={student.nis}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={student.avatar}
                  alt={student.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {student.name}
                    </h3>
                    <p className="text-gray-200 text-sm">{student.role}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-sm text-gray-500">NIS</div>
                    <div className="font-medium">{student.nis}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <p className="italic text-gray-600">&quot;{student.quote}&quot;</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
