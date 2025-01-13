import React from "react";
import HeaderLogado from "../../Molecule/Header/HeaderLogado/HeaderLogado";
import Sidebar from "../../Organism/Sidebar";
import "./Logado.css";
import ListaDePosts from "../../Molecule/ListaDePosts/ListaDePosts";

const Logado = () => {
  return (
    <>
      <div className="page-container">
        <HeaderLogado />
        <Sidebar />
        <ListaDePosts />
      </div>
    </>
  );
};

export default Logado;
