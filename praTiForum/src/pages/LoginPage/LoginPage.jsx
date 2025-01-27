import React from "react";
import LoginForm from "../../Organism/LoginForm/LoginForm";
import imagem from "../../assets/Images/imagem.png";
import { BiArrowBack } from "react-icons/bi"; // Importando a seta
import "./LoginPage.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="image-container-login">
        <img src={imagem} alt="Descrição" className="login-image" />
        <div className="overlay"></div>
        {/* Link de volta para a home com a seta */}
        <a href="/" className="back-to-home">
          <BiArrowBack size={34} /> {/* Ícone da seta para a esquerda */}
        </a>
      </div>
      <div className="form-container">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
