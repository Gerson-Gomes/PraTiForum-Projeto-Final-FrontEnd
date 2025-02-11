import React, { useRef, useState, useEffect, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import Input from "../../Atom/input/Input";
import Button from "../../Atom/button/Button";
import Logo from "../../Atom/Logo/Logo";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./SignForm.css";
import { GoogleLogin } from "@react-oauth/google";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignForm = () => {
  const userRef = useRef();
  const errRef = useRef();
  //Logica do usuario
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  //Logica do email
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  //Logica da senha
  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  //Logica da confirmação de senha
  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);



  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result)
  }, [email])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])

  // const [formData, setFormData] = useState({
  //   nome: "",
  //   email: "",
  //   senha: "",
  //   confirmaSenha: "",
  // });

  // const [errorMessage, setErrorMessage] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const validateForm = () => {
  //   if (!formData.nome || !formData.email || !formData.senha || !formData.confirmaSenha) {
  //     setErrorMessage("Preencha todos os campos.");
  //     return false;
  //   }
  //   if (formData.senha !== formData.confirmaSenha) {
  //     setErrorMessage("As senhas não são iguais.");
  //     return false;
  //   }
  //   setErrorMessage("");
  //   return true;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await userService.createUser(formData);
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      setErrorMessage("Erro ao cadastrar usuário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };





  return (
    <section className="formularioLogin">
      <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </p>
      <form className="form-content">
        <div className="logo-container">
          <Logo />
        </div>

        <div className="social-login">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse)
            }}
            onError={() => console.log("Deu ruim")} />
        </div>

        <p className="divider">
          <span className="line"></span> ou <span className="line"></span>
        </p>

        <div className="form-fields">
          <label htmlFor="userName" >Nome Completo</label>
          <input
            id="signInInput"
            type="text"
            name="nome"
            autoComplete="off"
            ref={userRef}
            placeholder="Digite seu Nome"
            value={user}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onChange={(e) => setUser(e.target.value)}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p id="uidnote" className={userFocus && user && !validName ? "requisitosUsuario" : "offscreen"}>
            Use de 4 a 24 caracteres <br />
            O primeiro digido deve ser uma letra <br />
            São permitidas: Letras, numeros, sobrelinha e hifens
          </p>
          <label htmlFor="email">Email</label>
          <input
            id="signInInput"
            type="email"
            name="email"
            placeholder="Digite seu Email"
            autoComplete="off"
            ref={userRef}
            value={email}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="uidnote"
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />

          <p id="uidnote" className={emailFocus && email && !validEmail ? "requisitosUsuario" : "offscreen"}>
            Insira um email valido
          </p>


          <div className="password-field">
            <label htmlFor="password">Senha</label>
            <input
              id="signInInput"
              type="password"
              name="password"
              placeholder="Digite sua senha"
              autoComplete="off"
              ref={userRef}
              value={pwd}



            />
            <button type="button" className="show-password-button" >

            </button>
          </div>

          <div className="password-field">
            <Input


            />
            <button
              type="button"
              className="show-password-button"
            >

            </button>
          </div>
        </div>

        <div className="form-buttons">
          <Button

          />
        </div>



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
