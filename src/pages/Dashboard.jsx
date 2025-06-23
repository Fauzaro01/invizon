import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getAllAnggota } from "./db";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const pindahHalaman = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })
    const fetchData = async () => {
      try {
        const datas = await getAllAnggota();
        const groupsData = datas.reduce((acc, item) => {
          const groupIndex = acc.findIndex(group => group[0]?.kelompokId === item.kelompokId);
          if (groupIndex > -1) {
              acc[groupIndex].push(item);
          } else {
              acc.push([item]);
          }
          
          return acc.sort((a,b) => {return a[0].kelompokId - b[0].kelompokId});
      }, [])
      setGroups(groupsData);
      console.log(groupsData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    pindahHalaman("/login");
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-grow text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Memuat Data, Harap Sabar yah...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Dashboard Admin</h1>
      <div className="card text-white mb-5 bg-success" style={{maxWidth: "32rem"}}>
        <div className="card-header d-flex justify-content-between">
            <button className="btn btn-sm btn-dark" onClick={() => pindahHalaman('/')}><i className="bi bi-arrow-left me-1"/>Home</button>
            <strong>Debugging Information</strong>
            <button className="btn btn-sm btn-dark" onClick={handleLogout}><i className="bi bi-unlock me-1"/>Logout</button>
          </div>
        <div className="card-body">
            <h4>Welcome Admin!</h4>
            <p>
                Logged in as: <strong>{user.email}</strong>
            </p>
            <p>
                User ID: <strong>{user.uid}</strong>
            </p>
        </div>
      </div>
      {groups.map((kelompok, idx) => (
        <div key={idx} className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Kelompok {idx + 1} | Total Anggota {kelompok.length}</h5>
          </div>
          <div className="card-body">
            <div className="row">
              {kelompok.map((member, memberIdx) => (
                <div key={memberIdx} className="col-md-4 col-sm-6 mb-3">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h6 className="card-title text-primary">{member.name}</h6>
                      <ul className="list-unstyled">
                        {member.projects.map((project, projectIdx) => (
                          <li key={projectIdx} className="mb-2">
                            <a
                              href={project.link}
                              className="text-decoration-none"
                              target="_blank"
                              rel="noopener noreferrer"
                            >

                              <i className="bi bi-link-45deg"></i> {project.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                      <button className="btn btn-sm btn-outline-primary w-100 mt-2">
                        Add Project
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
