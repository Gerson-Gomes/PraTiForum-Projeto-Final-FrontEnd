import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Cadastro from "./pages/SignPage/SignPage";
import Logado from "./pages/Logado/Logado";
import Profile from "./pages/Profile/Profile";
import About from "./pages/About/About";
import Institutional from "./pages/Institutional/Institutional";
import RotaProtegida from "./Atom/rotaprotegida/RotaProtegida"; // Componente de rota protegida

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<About />} />
        <Route path="/institutional" element={<Institutional />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/logado" element={<Logado />} />
        
        {/* Rota protegida com userId dinâmico */}
        <Route 
          path="/perfil-usuario/:userId" 
          element={
            <RotaProtegida>
              <Profile />
            </RotaProtegida>
          }
        /> 
      </Routes>
    </Router>
  );
}

export default App;
