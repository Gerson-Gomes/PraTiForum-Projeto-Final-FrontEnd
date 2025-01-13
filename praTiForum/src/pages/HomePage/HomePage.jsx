// MainContent.jsx
import React from "react";
import Header from "../../Molecule/Header/HeaderMain/HeaderMain";
import Sidebar from "../../Organism/Sidebar";
import MainContent from "../../Organism/MainContent";
import Footer from "../../Molecule/footer/footer";

function HomePage() {
  return (
    <>
      <Header />
      <Sidebar />
      <MainContent />      
      <Footer />
    </>
  );
}
export default HomePage;
