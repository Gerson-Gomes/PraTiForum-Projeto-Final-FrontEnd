import React, { useState, useEffect } from "react";
import InputSearch from "../../../Atom/input/InputSearch";
import Logo from "../../../Atom/Logo/Logo";
import ButtonGroupHeader from "../../ButtonGroupHeader/ButtonGroupHeader";
import "./HeaderMain.css";
import menuIcon from "../../../Atom/icons/menu-dropdown-mobile-icon.png";

function HeaderMain() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Estado para controlar o hover

  // Atualiza o estado isMobile conforme o tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 768;
      setIsMobile(isNowMobile);
  
      // Se a tela for maior que 800px, fechar o menu
      if (!isNowMobile) {
        setMenuOpen(false);
      }
    };
  
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="header">
      {/* Ícone do menu hambúrguer (aparece apenas no mobile) */}
      {isMobile && (
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <img src= {menuIcon} alt="Menu" className="menu-icon-img"
          />
        </div>
      )}

      {/* Logo do site */}
      <Logo />

      {/* Input de pesquisa */}
      <div className="container-input">
        <InputSearch label="" tipo="text" placeholder="Pesquisar..." />
      </div>

      {/* Botões do cabeçalho (visíveis apenas no desktop) */}
      {!isMobile && (
        <div className="header-buttons">
          <ButtonGroupHeader />
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
