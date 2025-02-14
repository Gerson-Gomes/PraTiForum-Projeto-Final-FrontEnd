import React, { useState, useEffect } from "react";
import InputSearch from "../../../Atom/input/InputSearch";
import Logo from "../../../Atom/Logo/Logo";
import ButtonGroupHeader from "../../ButtonGroupHeader/ButtonGroupHeader";
import "./HeaderMain.css";

function HeaderMain() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Estado para controlar o hover

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="header">
      <Logo />

      {/* Input de pesquisa */}
      <div className="container-input">
        <InputSearch label="" tipo="text" placeholder="Pesquisar..." />
      </div>

      {/* Botões, visíveis apenas em telas grandes */}
      {!isMobile && (
        <div className="header-buttons">
          <ButtonGroupHeader />
        </div>
      )}

      {/* Menu hambúrguer em telas menores */}
      {isMobile && (
        <div className="menu-title" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"} {/* Alterna entre ☰ e ✕ */}
        </div>
      )}

      {/* Exibe o menu mobile quando o menu hambúrguer é aberto */}
      {menuOpen && (
        <div className="mobile-menu">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#discussions">Discussões</a></li>
            <li><a href="#tags">Tags</a></li>
            <li
              onMouseEnter={() => setIsHovered(true)} // Ativa o hover
              onMouseLeave={() => setIsHovered(false)} // Desativa o hover
            >
              <a href="#sobre">Sobre</a>
              {isHovered && ( // Exibe o submenu apenas quando hover estiver ativo
                <ul className="submenu">
                  <li><a href="/team">Equipe</a></li>
                  <li><a href="#institucional">Institucional</a></li>
                </ul>
              )}
            </li>
            <li><a href="#profile">Perfil</a></li>
            <li><a href="#saved">Salvos</a></li>
            <li><a href="#questions">Suas perguntas</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default HeaderMain;