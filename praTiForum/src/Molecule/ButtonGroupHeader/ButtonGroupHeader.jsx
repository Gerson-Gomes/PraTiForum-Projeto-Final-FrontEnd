import React from "react";
import Button from "../../Atom/button/Button";
import { useNavigate } from "react-router-dom"; // Hook para navegação
import "./ButtonGroupHeader.css";

function ButtonGroupHeader() {
  const navigate = useNavigate(); // Inicializa o hook para navegação

  return (
    <div className="buttons">
      {/* Botão de Login */}
      <Button
        text="Entrar"
        className="secondary-button"
        onClick={() => navigate("/login")} // Navega para a página de login
      />

      {/* Botão de Cadastro */}
      {/* 
        <Button
        text="Cadastrar"
        className="primary-button"
        onClick={() => navigate("/cadastro")} // Navega para a página de cadastro
      />    
      */}  
    </div>

    
  );
}

export default ButtonGroupHeader;
