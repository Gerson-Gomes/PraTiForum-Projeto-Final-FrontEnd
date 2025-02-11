import React, { useRef, useState, useEffect, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import Button from "../../Atom/button/Button";
import Logo from "../../Atom/Logo/Logo";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./SignForm.css";
import { GoogleLogin } from "@react-oauth/google";
import axios from "../../services/userService";

const USER_REGEX = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,7}$/
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGISTER_URL = '/usuarios'

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



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

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)
    console.log(v1);
    console.log(v2);


    if (!v1 || !v2) {
      setErrMsg("Entrada Invalida");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({ user: nomeCompleto, pwd: senha, email }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(response.data);
      console.log(JSON.stringify(response));
      setSuccess(true)
    } catch (err) {
      if(!err?.response){
        setErrMsg('Sem resposta do servidor');
      } else {
        setErrMsg('Registration Failed')
      }
    }
  };





  return (
    <>
      {success ? (
        <section>
          <h1>Success</h1>
          <p>
            <a href="#"></a>
          </p>
        </section>
      ) : (
        <section className="formularioLogin">
          <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <form className="form-content" onSubmit={handleSubmit}>
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
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p pwdnote className={pwdFocus && !validPwd ? "requisitosUsuario" : "offscreen"}>A senha deve ter um minimo de 8 caracteres, uma letra e um numero</p>

              </div>

              <div className="password-field">
                <label htmlFor="confirm_pwd">Confirmar Senha</label>
                <input
                  id="confirm_pwd"
                  type="password"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "requisitosUsuario" : "offscreen"}>
                  As senhas devem ser identicas
                </p>

              </div>
            </div>

            <div className="form-buttons">
              <Button
                text={loading ? "Carregando..." : "Cadastrar"}
                className="login-button"
                type="submit"
                id="loginSubmit"
                disabled={!validName || !validPwd || !validEmail || !validMatch ? true : false}

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
      )}
    </>
  );
};

export default SignForm;
