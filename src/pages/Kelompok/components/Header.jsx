import { useNavigate } from "react-router-dom";

function Header({ kelompokId = 1}) {
  const pindahHalaman = useNavigate();

  return (
    <div className="card mt-4 m-auto" style={{ maxWidth: "65%" }}>
      <div className="card-header d-flex align-items-center">
        <button className="btn me-2" onClick={() => pindahHalaman("/", {})}>
          <i className="bi bi-arrow-left"></i>
        </button>
        <h3 className="card-title m-0">Kelompok {kelompokId}</h3>
      </div>
      <div className="card-body">
        <div
          className="alert alert-primary d-flex align-items-center"
          role="alert"
        >
          <i className="bi bi-info-circle flex-shrink-0 me-2"></i>
          Selamat Datang
        </div>
      </div>
    </div>
  );
}

export default Header;
