import React from "react";
import HeaderLogado from "../../Molecule/Header/HeaderLogado/HeaderLogado";
import Sidebar from "../../Organism/Sidebar";
import "./Logado.css";
import ListaDePosts from "../../Molecule/ListaDePosts/ListaDePosts";
import { useAuth } from "../../AuthContext";
import HeaderMain from "../../Molecule/Header/HeaderMain/HeaderMain";

const Logado = () => {
  const { isLogged } = useAuth()
  return (
    <>
      <div className="page-container">
        {isLogged ? <HeaderLogado /> : <HeaderMain />}
        <Sidebar />
        <ListaDePosts />
      </div>
    </>
  );
};

export default Logado;
