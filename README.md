# Website Invizone Class - SMKS TI Muhammadiyah 1 Cikampek
![Preview Website](https://res.cloudinary.com/dtzcamtgb/image/upload/v1750669819/Screenshot_invizon_web_vkmn7e.png)

## Tentang Website

Website ini merupakan platform resmi dari kelas RPL I GEN 8 (Invizone) di SMKS TI Muhammadiyah 1 Cikampek. Dibangun dengan teknologi modern untuk menampilkan informasi, prestasi, dan aktivitas kelas.

🔗 **Akses Website**: [https://invizon.web.app](https://invizon.web.app)

## Fitur Utama

- 🏠 **Halaman Beranda** dengan profil kelas dan section hero
- 📚 **Blog** untuk berita dan update terbaru
- 📷 **Galeri** foto kegiatan kelas
- 🏆 **Prestasi** siswa dan kelas
- 👥 **Profil Siswa** seluruh anggota kelas
- 🔐 **Admin Panel** untuk manajemen konten

## Teknologi yang Digunakan

- ⚛️ **Next.js** (App Router) - Framework React untuk frontend
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🔥 **Firebase**:
  - Firestore - Database untuk konten
  - Authentication - Sistem login admin
  - Hosting - Deploy website
- ✨ **Framer Motion** - Animasi interaktif
- 🔍 **SEO Optimization** - Optimalisasi mesin pencari

## Struktur Projek

```
invizone-website/
├── app/
│   ├── page.js               # Halaman utama
│   ├── admin/                # Halaman admin
│   ├── blog/                 # Halaman blog
│   ├── gallery/              # Halaman galeri
│   ├── students/             # Halaman profil siswa
│   ├── achievements/         # Halaman pencapaian
│   ├── not-found.js          # Halaman 404 custom
│   └── layout.js             # Layout utama
├── components/               # Komponen reusable
├── lib/                      # Konfigurasi Firebase
├── public/                   # Aset static
└── styles/                   # Global CSS
```

## Cara Menjalankan Projek

### Prasyarat
- Node.js (v18 atau lebih baru)
- Akun Firebase
- API keys Firebase

### Instalasi

1. Clone repositori:
```bash
git clone https://github.com/fauzaro01/invizon.git
cd invizon
```

2. Install dependencies:
```bash
npm install
```

3. Buat file `.env.local` dan isi dengan konfigurasi Firebase Anda:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Jalankan development server:
```bash
npm run dev
```

5. Buka di browser:
```
http://localhost:3000
```

## Deployment

Projek ini bisa di-deploy ke:

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://netlify.com)

```bash
npm run build
```

## Kontribusi

Kontribusi terbuka untuk pengembangan website ini. Ikuti langkah berikut:

1. Fork projek ini
2. Buat branch fitur baru (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## Lisensi

[MIT](https://choosealicense.com/licenses/mit/)

## Kontak

Untuk informasi lebih lanjut, hubungi:

- Instagram: [@invizonee](https://instagram.com/invizone_class)

## Informasi Repositori
![Views Counter](https://views-counter.vercel.app/badge?pageId=fauzaro01%2Finvizon&leftColor=000000&rightColor=0adb3f&type=total&label=Viewers&style=none)