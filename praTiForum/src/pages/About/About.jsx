import React from "react";
import CarouselPerson from "../../Molecule/carouselPerson";
import "./About.css";
import Sidebar from "../../Organism/Sidebar";
import HeaderMain from "../../Molecule/Header/HeaderMain/HeaderMain";
import Footer from "../../Molecule/footer/footer";

const About = () => {
  return (
    <>
      <HeaderMain />
      <Sidebar />

      <section id="nossa-equipe">
        <div className="apresentation">
          <h2 className="apresentation-title">Nossa Equipe</h2>
          <p className="apresentation-description">
            Somos um grupo de 7 integrantes apaixonados por tecnologia e desenvolvimento de software. Cada um de nós contribuiu com suas habilidades e experiências para tornar este projeto uma realidade.
          </p>
        </div>   
    
        <CarouselPerson />
      </section>
      <Footer />
    </>
  );
};

export default About;
