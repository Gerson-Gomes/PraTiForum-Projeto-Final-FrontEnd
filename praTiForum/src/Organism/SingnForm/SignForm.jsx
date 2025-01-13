import React from "react";
import Input from "../../Atom/input/input";
import Button from "../../Atom/button/Button";
import GoogleButton from "../../Atom/button/GoogleButton";
import Logo from "../../Atom/Logo/Logo";
import DropdownList from "../../Atom/dropdownList/dropdownList";
import "./SignForm.css";
import { useNavigate } from "react-router-dom"; // Hook para navegação

const SignForm = () => {
  const times = [
    "Fullstack",
    "Front-End",
    "Back-end",
    "Data Science",
    "Devops",
    "UX e Design",
    "Mobile",
    "Inovação e Gestão",
  ];
  const navigate = useNavigate(); // Inicializa o hook para navegação
  return (
    <div className="formularioSign">
      <form>
        <Logo />
        <h1>Crie sua conta e faça parte!</h1>
        <GoogleButton text="Cadastre-se com Google" className="google-button" />
        <p>OU</p>
        <Input label="Nome" tipo="text" placeholder="Digite seu Nome" />
        <Input label="Sobrenome" tipo="text" placeholder="Digite seu Sobrenome" />
        <DropdownList label="Área de atuação" itens={times} />
        <Input label="Email" tipo="email" placeholder="Email" />
        <Input label="Senha" placeholder="Digite sua senha" type="password" />
        <Button text="Cadastre-se" className="tertiary-button" />
        <div className="singn-page">
          <p>Já possui uma conta? </p>
          <Button
            text="Entrar"
            className="primary-button"
            onClick={() => navigate("/login")} // Navega para a página de login
          />
        </div>
      </form>
    </div>
  );
};

export default SignForm;
