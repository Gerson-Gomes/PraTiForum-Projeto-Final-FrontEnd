import React, { useState, useEffect } from "react";
import Logo from "../../Atom/Logo/Logo";
import ProfilePicture from "../../Atom/perfil/ProfilePicture";
import menuIcon from "../../Atom/icons/menu-dropdown-mobile-icon.png"
import profile from "../../Atom/icons/icon-profile.png"
import "./MenuMobile.css";

function MenuMobile() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
        setSubMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="header">
      {isMobile && (
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <img src={menuIcon} alt="Menu" className="menu-icon-img" />
        </div>
      )}

      <Logo className="header-logo" />

      <div className="header-perfil">
        <ProfilePicture src={profile} alt="Perfil" size={50} />
      </div>

      {isMobile && menuOpen && (
        <div className="mobile-menu">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#discussions">Discussões</a></li>
            <li><a href="#tags">Tags</a></li>

            {/* Dropdown de Sobre */}
            <li>
              <div onClick={() => setSubMenuOpen(!subMenuOpen)} style={{ cursor: "pointer" }}>
                Sobre {subMenuOpen ? "▲" : "▼"}
              </div>
              {subMenuOpen && (
                <ul className="submenu">
                  <li><a href="/team">Equipe</a></li>
                  <li><a href="/Institutional">Institucional</a></li>
                </ul>
              )}
            </li>

            <li><a href="#saved">Salvos</a></li>
            <li><a href="#questions">Suas perguntas</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default MenuMobile;