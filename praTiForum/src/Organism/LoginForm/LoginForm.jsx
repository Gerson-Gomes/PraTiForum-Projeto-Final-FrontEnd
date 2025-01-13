import React from "react";
import Input from "../../Atom/input/input";
import Button from "../../Atom/button/Button";
import GoogleButton from "../../Atom/button/GoogleButton";
import Logo from "../../Atom/Logo/Logo";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";



const LoginForm = () => {
    const navigate = useNavigate();
  return (
    <section className="formularioLogin">
      <form>
        <Logo />
        <h1>Seja Bem-Vindo(a)</h1>
        <GoogleButton text="Entre com Google" className="google-button" />
        <p>OU</p>
        <Input label="Email" tipo="email" placeholder="Email" />
        <Input label="Senha" placeholder="Digite sua senha" type="password" />
        <Button text="Entrar" className="primary-button" onClick={() => handleLogin} />
        <p>Ainda não possui uma conta?</p>
        <Button text="Cadastre-se" className="tertiary-button" onClick={() => navigate("/cadastro")} />
      </form>
    </section>
  );
};

export default LoginForm;
