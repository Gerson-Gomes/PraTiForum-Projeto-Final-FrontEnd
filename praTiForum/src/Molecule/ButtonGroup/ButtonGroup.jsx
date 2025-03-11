import React from "react";
import Button from "../../Atom/button/Button";
import "./ButtonGroup.css";
import { useNavigate } from "react-router-dom";

function ButtonGroup() {
  const navigate = useNavigate();
  return (
    <div className="buttons">
      <Button text="Cadastrar" className="primary-button" onClick={() => navigate("/cadastro")} />
      <Button
        text="Institucional"
        className="secondary-button"
        onClick={() => (window.location.href = "")}
      />
      {/* <Button
        text="TESTE-PERFIL"
        className="primary-button"
        onClick={() => navigate("/perfil-usuario")}
      /> */}

      {/* <Button text="TESTE" className="primary-button" onClick={() => navigate("/logado")} /> */}
    </div>

  );
}

export default ButtonGroup;
