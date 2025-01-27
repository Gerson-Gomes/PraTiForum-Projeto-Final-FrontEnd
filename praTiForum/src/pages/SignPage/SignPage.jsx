import React from "react";
import SignForm from "../../Organism/SingnForm/SignForm";
import imagem from "../../assets/Images/imagem.png";
import { BiArrowBack } from "react-icons/bi"; // Importando o ícone
import "./SignPage.css";

const Cadastro = () => {
  return (
    <div className="login-container">
      <div className="image-container-login">
        <img src={imagem} alt="Descrição" className="login-image" />
        <div className="overlay"></div>
        {/* Link de volta para a home com o ícone */}
        <a href="/" className="back-to-home">
          <BiArrowBack size={34} /> {/* Ícone de seta */}
        </a>
      </div>
      <div className="form-container">
        <SignForm />
      </div>
    </div>
  );
};

export default Cadastro;
