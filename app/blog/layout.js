export const metadata = {
    title: "Invizone Blog | Latest Updates from Our Class",
    description: "Read the latest news, events, and achievements from Invizone Class at SMKS TI Muhammadiyah 1 Cikampek.",
    keywords: ["class blog", "student updates", "school activities", "Invizone news"],
    openGraph: {
      title: "Invizone Blog | Latest Class Updates",
      description: "Stay updated with the latest news from Invizone Class",
      url: "https://invizon.web.app/blog",
      images: [
        {
          url: "https://invizon.web.app/hero.webp",
          alt: "Invizone Class Blog",
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: "https://invizon.web.app/blog",
    },
    robots: {
      index: true,
      follow: true,
    },
  }

export default function BlogLayout({ children }) {
  return children
}