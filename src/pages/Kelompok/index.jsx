import { useEffect, useState } from 'react';
import Header from './components/Header';
import BrandLogo from './components/BrandLogo';
import ProfileCard from './components/ProfileCard';
import Footer from './components/Footer';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { getAnggotaByKelompokId } from '../db';

// const profiles = [
//   {
//     name: "Aditya Naruzaky",
//     imgSrc: "https://res.cloudinary.com/dtzcamtgb/image/upload/v1734448884/kel1_kxmuk0.webp",
//     projects: [
//       { title: "Project 1", link: "#project1" },
//       { title: "Project 2", link: "#project2" },
//       { title: "Project 3", link: "#project3" },
//     ]
//   },
//   {
//     name: "Tristan Adriansyah",
//     imgSrc: "https://res.cloudinary.com/dtzcamtgb/image/upload/v1734448884/kel1_kxmuk0.webp",
//     projects: [
//       { title: "Project A", link: "#projectA" },
//       { title: "Project B", link: "#projectB" },
//     ]
//   },
//   {
//     name: "Faiza Bagas",
//     imgSrc: "https://res.cloudinary.com/dtzcamtgb/image/upload/v1734448884/kel1_kxmuk0.webp",
//     projects: [
//       { title: "Project X", link: "#projectX" },
//       { title: "Project Y", link: "#projectY" },
//     ]
//   },
//   // Tambahkan profil lainnya sesuai kebutuhan
// ];

function index() {
  const [anggotaData, setAnggotaData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { kelompokId } = useParams();
  const navigate = useNavigate(); 
  const kelProfile = [
    "https://res.cloudinary.com/dtzcamtgb/image/upload/v1734448877/logokel1_th7qjq.webp",
    "https://res.cloudinary.com/dtzcamtgb/image/upload/v1734448878/logokel2_gqdlq7.webp",
    "https://res.cloudinary.com/dtzcamtgb/image/upload/v1734448874/logogiegiebone_rgjsxn.webp",
    "https://res.cloudinary.com/dtzcamtgb/image/upload/v1734448878/logokel4_m77wy8.webp",
    "https://res.cloudinary.com/dtzcamtgb/image/upload/v1734448879/logokel5_xxqxl4.webp"
  ];
  const imgkelUrl = kelProfile[kelompokId-1];
  
  useEffect(() => {
    if (window.location.pathname.split('/').length > 3 || !/^[1-5]$/.test(kelompokId)) {
      alert("wkwk");
      // return <Navigate to= "/redirect?to=https://fauzar01.web.app" replace/>
    }
    

    const fetchData = async () => {
      const anggotaDatas = await getAnggotaByKelompokId(parseInt(kelompokId));
      setAnggotaData(anggotaDatas);
      setLoading(true);
    }

    fetchData();
  }, [kelompokId, navigate]);
  return (
    <HelmetProvider>
     <Helmet >
        <title>Invizon | Kelompok {kelompokId}</title>
        <link rel="stylesheet" href="/css/kelompok.css" />
        <link rel="stylesheet" href={`/css/kelompok${kelompokId}.css`} />
        <link rel="icon" href={imgkelUrl} type="image/webp" />
     </Helmet>
      <Header kelompokId={kelompokId}/>
      <BrandLogo imgUrl={imgkelUrl} />
      {loading && (
        <div className="container my-3 py-3">
        <div className="row">
          {anggotaData.map((siswa, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 my-2">
              <ProfileCard 
                name={siswa.name} 
                imgSrc={siswa.imgSrc} 
                projects={siswa.projects} 
              />
            </div>
          ))}
        </div>
      </div>
      )}
      <Footer />



    </HelmetProvider>
  );
}

export default index;
