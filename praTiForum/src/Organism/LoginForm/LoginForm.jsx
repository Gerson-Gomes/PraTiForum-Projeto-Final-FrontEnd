import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import Input from "../../Atom/input/Input";
import Button from "../../Atom/button/Button";
import Logo from "../../Atom/Logo/Logo";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./LoginForm.css";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../AuthContext";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {isLogged, setIsLogged} = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      const response = await userService.login(formData);

      if (response.token) {
        console.log("Login realizado com sucesso:", response);
        localStorage.setItem("token", response.token);
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
          console.log("Token salvo com sucesso:", savedToken);
        } else {
          console.log("Falha ao salvar o token");
        }
        setIsLogged(true)
        navigate("/");
      } else {
        setErrorMessage("Email ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      setErrorMessage("Erro ao conectar com o servidor. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="formularioLogin">
      <form onSubmit={handleLogin} className="form-content">
        <div className="logo-container">
          <Logo />
        </div>

        <div className="social-login">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => console.log("Deu ruim")}
          />
        </div>

        <p className="divider">
          <span className="line"></span> ou <span className="line"></span>
        </p>

        <div className="form-fields">
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
              name="password"
              placeholder="Digite sua senha"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="show-password-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="forgot-password">
            <a href="/esqueci-senha" className="forgot-password-link">
              Esqueci minha senha
            </a>
          </div>
        </div>

        <div className="form-buttons">
          <Button
            text={loading ? "Carregando..." : "Entrar"}
            className="login-button"
            type="submit"
            disabled={loading}
          />
        </div>

        {errorMessage && (
          <p className="error-message">
            {errorMessage === "Email ou senha inválidos."
              ? "Por favor, verifique suas credenciais."
              : "Erro ao conectar com o servidor. Tente novamente mais tarde."}
          </p>
        )}

        <p className="signup-prompt">
          Ainda não possui uma conta?{" "}
          <a href="/Cadastro" className="signup-prompt-link">
            Cadastre-se
          </a>
        </p>
      </form>
    </section>
  );
};

export default LoginForm;

