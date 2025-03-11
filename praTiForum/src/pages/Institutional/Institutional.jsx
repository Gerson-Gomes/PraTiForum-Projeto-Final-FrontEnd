import React from "react";
import "./Institutional.css";
import Sidebar from "../../Organism/Sidebar";
import HeaderMain from "../../Molecule/Header/HeaderMain/HeaderMain";
import Footer from "../../Molecule/footer/footer";
import { useAuth } from "../../AuthContext";
import HeaderLogado from "../../Molecule/Header/HeaderLogado/HeaderLogado";

const Institutional = () => {
  const { isLogged } = useAuth()
  return (
    <>
      <HeaderLogado/>
      <Sidebar />

      <div className="main-container">
        <section id="sobre">
          <div className="conteudo-sobre">
            <div className="texto">
              <img src="src/assets/images/mais-icon.png" alt="Ícone Mais" />
              <h2>SOBRE</h2>
            </div>
            <div className="descricao-e-imagem">
              <div className="descricao">
                <h1>+PraTi Fórum</h1>
                <p>
                  Um espaço criado por estudantes, para estudantes, onde você pode
                  compartilhar ideias, tirar dúvidas, colaborar em projetos e trocar
                  experiências. Nosso objetivo é fortalecer a comunidade e promover
                  o aprendizado contínuo.
                </p>
              </div>
              <div className="imagem">
                <img src="src/assets/images/img-maisPraTi.png" alt="Estudante do MaisPraTi" />
              </div>
            </div>
          </div>
        </section>

        <section className="start" id="projeto">
          <img src="src/assets/images/mais-icon.png" alt="Ícone Mais" />
          <h2>O PROJETO</h2>
        </section>

        <article>
          <h1>Um trabalho de conclusão</h1>
          <p>
            Este fórum foi criado como projeto final da Formação Full Stack da
            +PraTi. Aplicamos na prática tudo o que aprendemos, utilizando
            tecnologias como JavaScript, React, Java, Spring Boot, SQL (...), além
            de fortalecermos nossas habilidades de equipe e resolução de
            problemas.
          </p>
        </article>

        <div className="button-container">
          <a href="https://www.maisprati.com.br/" target="_blank">
            <button>SITE OFICIAL</button>
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Institutional;


