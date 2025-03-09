import React, { useState, useEffect } from "react";
import InputSearch from "../../../Atom/input/InputSearch";
import Logo from "../../../Atom/Logo/Logo";
import ButtonGroupHeader from "../../ButtonGroupHeader/ButtonGroupHeader";
import "./HeaderMain.css";
import menuIcon from "../../../Atom/icons/menu-dropdown-mobile-icon.png";
import MenuMobile from "../../MenuMobile/MenuMobile";

function HeaderMain() {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
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
      {isMobile && (
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <img src={menuIcon} alt="Menu" className="menu-icon-img" />
        </div>
      )}

      <Logo />

      <div className="container-input">
        <InputSearch label="" tipo="text" placeholder="Pesquisar..." />
      </div>

      {!isMobile && (
        <div className="header-buttons">
          <ButtonGroupHeader />
        </div>
      )}

      {/* Usa o componente externo agora */}
      {isMobile && menuOpen && (
        <MenuMobile
          subMenuOpen={subMenuOpen}
          setSubMenuOpen={setSubMenuOpen}
        />
      )}
    </nav>
  );
}

export default HeaderMain;