import React from "react";
import CarouselPerson from "../../Molecule/carouselPerson";
import "./About.css";
import Sidebar from "../../Organism/Sidebar";
import HeaderMain from "../../Molecule/Header/HeaderMain/HeaderMain";
import Footer from "../../Molecule/footer/footer";
import { useAuth } from "../../AuthContext";
import HeaderLogado from "../../Molecule/Header/HeaderLogado/HeaderLogado.jsx";

const About = () => {
  const { isLogged } = useAuth()
  return (
    <>
      <HeaderLogado/>
      <Sidebar />

      <section id="nossa-equipe">
        <div className="apresentation">
          <h2 className="apresentation-title">Nossa Equipe</h2>
          <p className="apresentation-description">
            Somos um grupo de 8 integrantes apaixonados por tecnologia e desenvolvimento de software. Cada um de nós contribuiu com suas habilidades e experiências para tornar este projeto uma realidade.
          </p>
        </div>

        <CarouselPerson />
      </section>
      <Footer />
    </>
  );
};

export default About;
