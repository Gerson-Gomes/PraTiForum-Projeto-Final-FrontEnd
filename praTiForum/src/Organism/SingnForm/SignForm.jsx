import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import Input from "../../Atom/input/Input";
import Button from "../../Atom/button/Button";
import Logo from "../../Atom/Logo/Logo";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./SignForm.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const SignForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmaSenha: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmaSenha) {
      setErrorMessage("Preencha todos os campos.");
      return false;
    }
    if (formData.senha !== formData.confirmaSenha) {
      setErrorMessage("As senhas não são iguais.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await userService.createUser(formData);
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.log(formData);
      
      console.error("Erro ao cadastrar usuário:", error);
      setErrorMessage("Erro ao cadastrar usuário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="formularioLogin">
      <form onSubmit={handleSubmit} className="form-content">
        <div className="logo-container">
          <Logo />
        </div>

        <div className="social-login">
          <GoogleLogin 
            onSuccess={(credentialResponse) =>{
              const googleUser = jwtDecode(credentialResponse.credential)
              console.log(googleUser);
              userService.createUser(googleUser)
            }}
            onError={()=>console.log("Deu ruim")}  />
        </div>

        <p className="divider">
          <span className="line"></span> ou <span className="line"></span>
        </p>

        <div className="form-fields">
          <Input
            label="Nome Completo"
            type="text"
            name="nome"
            placeholder="Digite seu Nome"
            value={formData.nome}
            onChange={handleChange}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Digite seu Email"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="password-field">
            <Input
              label="Senha"
              type={showPassword ? "text" : "password"}
              name="senha"
              placeholder="Digite sua senha"
              value={formData.senha}
              onChange={handleChange}
            />
            <button type="button" className="show-password-button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="password-field">
            <Input
              label="Confirme sua Senha"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmaSenha"
              placeholder="Digite novamente a senha"
              value={formData.confirmaSenha}
              onChange={handleChange}
            />
            <button
              type="button"
              className="show-password-button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="form-buttons">
          <Button
            text={loading ? "Carregando..." : "Cadastrar"}
            className="login-button"
            type="submit"
            disabled={loading}
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className="signup-prompt">
          Já possui uma conta?{" "}
          <a href="/login" className="signup-prompt-link">
            Entrar
          </a>
        </p>
      </form>
    </section>
  );
};

export default SignForm;
