import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Index from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Kelompok from "./pages/Kelompok";
import RedirectPage from "./pages/RedirectPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/kelompok/:kelompokId" element={<Kelompok/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/redirect" element={<RedirectPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
      </Routes>
    </Router>
  );
};

export default App;
