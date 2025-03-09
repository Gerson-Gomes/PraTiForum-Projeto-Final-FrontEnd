// MainContent.jsx
import React from "react";
import Header from "../../Molecule/Header/HeaderMain/HeaderMain";
import HeaderLogado from "../../Molecule/Header/HeaderLogado/HeaderLogado";
import Sidebar from "../../Organism/Sidebar";
import MainContent from "../../Organism/MainContent";
import Footer from "../../Molecule/footer/footer";
import "./HomePage.css";
import { useAuth } from "../../AuthContext";

function HomePage() {
  const {isLogged} = useAuth()
  return (
    <>
      <div className="page-container">
        {true ? <HeaderLogado/>: <Header/>}
        <Sidebar />
        <MainContent />
        <Footer />
      </div>
    </>
  );
}
export default HomePage;
