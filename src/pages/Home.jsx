import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HelmetProvider, Helmet } from 'react-helmet-async';

const index = () => {
  const [counter, setCounter] = useState(0);
  const pindahHalaman = useNavigate();

  const HiddenbtnHandle = () => {
    setCounter((prevCount) => prevCount + 1);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Invizon | Home</title>
        <link rel="icon" type="image/webp" href="https://res.cloudinary.com/dtzcamtgb/image/upload/v1735820488/compres_logo_yjluma.webp" />
        <link rel="stylesheet" href="/css/home.css" />
      </Helmet>
      <div className="navbar wavebox">
        <div className="container-fluid">
          <div className="title" onClick={HiddenbtnHandle}>
            The Invisioner
          </div>
          {counter >= 10 && (
            <button className="btn btn-sm btn-primary bg-gradient" onClick={() => pindahHalaman('/login')}>Login</button>
          )}
        </div>
      </div>
      <img src="https://res.cloudinary.com/dtzcamtgb/image/upload/v1734448873/firstimg_y9ruls.webp" alt="..." className="img-fluid m-min" />
      <div className="wavebox">
        <div className="title">INVISIONER ZONE</div>
      </div>
      <div className="px-5 mt-4">
        <img src="https://res.cloudinary.com/dtzcamtgb/image/upload/v1734448884/topimg_yxwncb.webp" alt="..." className="img-fluid animation rounded-4" />
      </div>
      <div className="box-m mt-2">
        <h4 className="title">Project the invisioner</h4>
      </div>
      <div className="container my-3">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4 my-2">
            <div className="card card1 p-3" onClick={() => pindahHalaman('/kelompok/1')}>
              <img src="https://res.cloudinary.com/dtzcamtgb/image/upload/v1734448873/firstimg_y9ruls.webp" alt="..." className="card-img-top" />
              <div className="card-body my-3">
                <h4 className="card-title text-center mb-2">KELOMPOK 1</h4>
                <p className="card-text text-center">Beranggota 8 orang</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 my-2">
            <div className="card card1 p-3" onClick={() => pindahHalaman('/kelompok/2')}>
              <img src="https://res.cloudinary.com/dtzcamtgb/image/upload/v1734448873/firstimg_y9ruls.webp" alt="..." className="card-img-top" />
              <div className="card-body my-3">
                <h4 className="card-title text-center mb-2">KELOMPOK 2</h4>
                <p className="card-text text-center">Beranggota 6 orang</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 my-2">
            <div className="card card1 p-3" onClick={() => pindahHalaman('/kelompok/3')}>
              <img src="https://res.cloudinary.com/dtzcamtgb/image/upload/v1734448873/firstimg_y9ruls.webp" alt="..." className="card-img-top" />
              <div className="card-body my-3">
                <h4 className="card-title text-center mb-2">KELOMPOK 3</h4>
                <p className="card-text text-center">Beranggota 7 orang</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 my-2">
            <div className="card card1 p-3" onClick={() => pindahHalaman('/kelompok/4')}>
              <img src="https://res.cloudinary.com/dtzcamtgb/image/upload/v1734448873/firstimg_y9ruls.webp" alt="..." className="card-img-top" />
              <div className="card-body my-3">
                <h4 className="card-title text-center mb-2">KELOMPOK 4</h4>
                <p className="card-text text-center">Beranggota 7 orang</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 my-2">
            <div className="card card1 p-3">
              <img src="https://res.cloudinary.com/dtzcamtgb/image/upload/v1734448880/middle_photo_cj0saf.webp" alt="..." className="card-img-top heightmiddle" />
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 my-2">
            <div className="card card1 p-3" onClick={() => pindahHalaman('/kelompok/5')}>
              <img src="https://res.cloudinary.com/dtzcamtgb/image/upload/v1734448873/firstimg_y9ruls.webp" alt="..." className="card-img-top" />
              <div className="card-body my-3">
                <h4 className="card-title text-center mb-2">KELOMPOK 5</h4>
                <p className="card-text text-center">Beranggota 8 orang</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <img src="https://res.cloudinary.com/dtzcamtgb/image/upload/v1734448872/bottomimg_vzfhqz.webp" alt="..." className="img-fluid bottomimg w-100" />
      <div className="wavebox">
        <div className="title">About Invisioner</div>
      </div>
      <div className="d-flex">
        <div className="card my-3 cardbottom">
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body mt-5">
                <h1 className="card-title">"Setiap momen yang kita habiskan bersama adalah bagian dari perjalanan kita. Teruslah menciptakan kenangan indah!"</h1>
                <p className="card-text">AYO IKUTI KEGIATAN KITA DISINI
                  <a href="https://www.instagram.com/inovasioner.zone?igsh=dDRmNG54Zjdpbzhu" className="link-opacity-75 text-decoration-none fw-bold"> OUR MOMENT</a>
                </p>
                  <p>Website By : </p>
                    <ul className="contributor-list">
                      <li>Ratu Maura Erlangga <span className="badge rounded-pill bg-primary bg-gradient">UI/UX</span></li> 
                      <li>Sekar rahayu <span className="badge rounded-pill bg-secondary bg-gradient">Front-End</span></li> 
                      <li>Muhamad Fauzaan <span className="badge rounded-pill bg-dark bg-gradient">Back-End</span></li>
                    </ul>
              </div>
            </div>
            <div className="col-md-4 p-3">
              <img src="https://res.cloudinary.com/dtzcamtgb/image/upload/v1734448873/lastimg_g3lnlp.webp" alt="..." className="img-fluid rounded-start rounded-custom-wak" />
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default index;
