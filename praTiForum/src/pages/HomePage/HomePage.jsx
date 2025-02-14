// MainContent.jsx
import React from "react";
import Header from "../../Molecule/Header/HeaderMain/HeaderMain";
import Sidebar from "../../Organism/Sidebar";
import MainContent from "../../Organism/MainContent";
import Footer from "../../Molecule/footer/footer";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <div className="page-container">
        <Header />
        <Sidebar />
        <MainContent />
        <Footer />
      </div>
    </>
  );
}
export default HomePage;
