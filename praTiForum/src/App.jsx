// import { useState } from 'react'
// import Footer from './Atom/footer/Footer'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>

//       <Footer/>
//     </>
//   )
// }

// export default App

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Cadastro from "./pages/SignPage/SignPage";
import Logado from "./pages/Logado/Logado";
import Profile from "./pages/Profile/Profile"; // gabi
import About from "./pages/About/About";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Página inicial */}
        <Route path="/team" element={<About />} /> {/* Página Sobre */}
        <Route path="/login" element={<LoginPage />} /> {/* Página de Login */}
        <Route path="/cadastro" element={<Cadastro />} /> {/* Página de Cadastro */}
        <Route path="/logado" element={<Logado />} /> {/* Página logado */}
        <Route path="/perfil-usuario" element={<Profile />} /> {/* Página de usuário */} 
      </Routes>
    </Router>
  );
}

export default App;
