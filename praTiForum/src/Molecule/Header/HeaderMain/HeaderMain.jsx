import React, { useState, useEffect } from "react";
import InputSearch from "../../../Atom/input/InputSearch";
import Logo from "../../../Atom/Logo/Logo";
import ButtonGroupHeader from "../../ButtonGroupHeader/ButtonGroupHeader";
import "./HeaderMain.css";
import menuIcon from "../../../Atom/icons/menu-dropdown-mobile-icon.png";

function HeaderMain() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Atualiza o estado `isMobile` quando a tela muda de tamanho
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);

      // Se estiver saindo do modo mobile, fecha o menu mobile
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="header">
      {/* Ícone do Menu Mobile (só aparece em telas menores que 1024px) */}
      {isMobile && (
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <img src={menuIcon} alt="Menu" className="menu-icon-img" />
        </div>
      )}

      {/* Logo do Site (agora não some mais) */}
      <Logo />

      {/* Input de Pesquisa */}
      <div className="container-input">
        <InputSearch label="" tipo="text" placeholder="Pesquisar..." />
      </div>

      {/* Botões do Header (apenas no desktop) */}
      {!isMobile && (
        <div className="header-buttons">
          <ButtonGroupHeader />
        </div>
      )}

      {/* Menu Mobile (só aparece quando o menu estiver aberto) */}
      {isMobile && menuOpen && (
        <div className="mobile-menu">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#discussions">Discussões</a></li>
            <li><a href="#tags">Tags</a></li>
            <li><a href="#sobre">Sobre</a></li>
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