import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService"; // Importa o serviço
import Input from "../../Atom/input/Input";
import Button from "../../Atom/button/Button";
import GoogleButton from "../../Atom/button/GoogleButton";
import Logo from "../../Atom/Logo/Logo";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importa os ícones de olho
import "./LoginForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Novo estado
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.senha) {
      setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      const users = await userService.getAllUsers(); // Usa o serviço para buscar os usuários
      const user = users.find((u) => u.email === formData.email && u.senha === formData.senha);

      if (user) {
        console.log("Login realizado com sucesso:", user);
        navigate("/dashboard");
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
          <GoogleButton text="Entrar com Google" className="google-button" />
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

          {/* Campo de senha com botão de ícone para alternar visibilidade */}
          <div className="password-field">
            <Input
              label="Senha"
              type={showPassword ? "text" : "password"} // Alterna entre "text" e "password"
              name="senha"
              placeholder="Digite sua senha"
              value={formData.senha}
              onChange={handleChange}
            />
            <button
              type="button"
              className="show-password-button"
              onClick={() => setShowPassword(!showPassword)} // Alterna a visibilidade da senha
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Ícone de olho ou olho riscado */}
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
