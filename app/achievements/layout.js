export const metadata = {
    title: "Class Achievements | Invizone Awards & Honors",
    description: "Celebrating the achievements and awards of Invizone Class students at SMKS TI Muhammadiyah 1 Cikampek.",
    keywords: ["student achievements", "class awards", "school honors", "Invizone wins"],
    openGraph: {
      title: "Invizone Achievements | Class Awards & Honors",
      description: "Our class achievements and awards",
      url: "https://invizon.web.app/achievements",
      images: [
        {
          url: "https://invizon.web.app/hero.webp",
          alt: "Invizone Class Achievements",
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: "https://invizon.web.app/achievements",
    },
  }

export default function AchievementsLayout({ children }) {
  return children;
}