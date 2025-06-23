import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { HelmetProvider, Helmet } from 'react-helmet-async';

const Login = () => {
  const [userState, setUserState] = useState({
    email: "",
    password: "",
  });
  const [tempMsg, setTempMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserState((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(
      auth,
      userState.email,
      userState.password
    ).then((e) => {
      navigate("/dashboard");
    }).catch((eror) => setTempMsg(eror));
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Halaman Login Admin</title>
        <link rel="stylesheet" href="/css/login.css" />
      </Helmet>

      <div className="wrapcontainer">
        <div className="container">
          <h1 className="textlogin">Login as Admin</h1>
          <form>
            { tempMsg && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <strong><i className="bi bi-shield-exclamation me-1"></i> Akses di tolak!</strong> Username atau Password ada mungkin salah.
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            ) }
            <div className="mb-3">
              <label htmlFor="emailform" className="from-label">
                Email
              </label>
              <input
                type="email"
                id="emailform"
                className="form-control"
                name="email"
                value={userState.name}
                onChange={handleChange}
                placeholder="Enter your Email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="passwordform" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="passwordform"
                className="form-control"
                name="password"
                value={userState.name}
                onChange={handleChange}
                placeholder="Enter your Password"
                required
              />
            </div>
            <button className="btn btn-primary" onClick={handleLogin}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Login;
