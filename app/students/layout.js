
export const metadata = {
    title: "Meet Our Students | Invizone Class Profiles",
    description: "Get to know the students of Invizone Class at SMKS TI Muhammadiyah 1 Cikampek. See profiles, achievements, and roles.",
    keywords: ["class students", "student profiles", "class members", "Invizone class"],
    openGraph: {
      title: "Invizone Students | Class Profiles",
      description: "Meet the students of Invizone Class",
      url: "https://invizon.web.app/students",
      images: [
        {
          url: "https://invizon.web.app/hero.webp",
          alt: "Invizone Class Students",
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: "https://invizon.web.app/students",
    },
}

export default function StudentsLayout({ children }) {
  return children
}