import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import NainaSalonWebsite from "./naina";


// ✅ Admin route protection wrapper
const AdminRoute = ({ element }) => {
  const role = localStorage.getItem("role");
  return role === "admin" ? element : <Navigate to="/login" replace />;
};

// ✅ Wrapper to handle Navbar visibility
const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login"; // hide only on login

  return (
    <>
      {/* {!hideNavbar && <Navbar />} 👈 hide Navbar on /login */}
      <Routes>
        <Route path="/" element={<NainaSalonWebsite />} />
       

      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
