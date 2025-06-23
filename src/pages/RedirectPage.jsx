import { useEffect, useState } from "react";
import { analytics } from "../firebase";
import { logEvent } from "firebase/analytics";
import { useLocation, useNavigate } from "react-router-dom";

const RedirectPage = () => {
    const location  = useLocation();
    const navigate = useNavigate();
    const [destination, setDestination] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const to = params.get('to'); 

        if (to) {
            const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
            if (urlPattern.test(to)) {
                setDestination(to);
                logEvent(analytics, 'redirect_event', {
                  destination: to,
                });
                setTimeout(() => {
                    window.location.href = to;
                }, 2500);

            } else if(to === "/project-kosong") {
                navigate("/project-kosong");
            }
            else {
                alert("URL Tujuan Mu tidak valid. harap check kembali");
                navigate(-1);
            }
        }
        else {
            alert("Parameter to tidak ditemukan.");
            navigate(-1);
        }
        }, [location, navigate]);
      
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <div className="shadow-lg p-3 mb-5 bg-body rounded text-center" style={{width: "60%"}}>
                <div className="spinner-grow text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                {destination ? (
                <p className="mt-3">Redirecting to: <a className="btn" href={destination} target="_blank" rel="noopener noreferrer">{destination}</a></p>
                ) : (
                    <p className="mt-3">Loading...</p>
                )}
                </div>
            </div>
    );
}

export default RedirectPage;