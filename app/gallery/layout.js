export const metadata = {
    title: "Class Gallery | Invizone Photo Collections",
    description: "View photos from Invizone Class events, activities, and memorable moments at SMKS TI Muhammadiyah 1 Cikampek.",
    keywords: ["class photos", "school gallery", "event pictures", "Invizone memories"],
    openGraph: {
      title: "Invizone Gallery | Class Photo Collections",
      description: "View our class photo gallery",
      url: "https://invizon.web.app/gallery",
      images: [
        {
          url: "https://invizon.web.app/images/gallery-og-image.jpg",
        alt: "Invizone Class Gallery",
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: "https://invizon.web.app/gallery",
    },
  }

export default function GalleryLayout({ children }) {
  return children;
}