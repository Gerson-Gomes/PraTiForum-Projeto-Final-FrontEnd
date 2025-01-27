import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar a visibilidade do Sidebar

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  
  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <ul>
          <li className={activeItem === "home" ? "active" : ""} onClick={() => handleItemClick("home")}>
            <a href="/">
              <img src="./src/Atom/icons/icon-home.png" alt="Home" className="icon" />
              Home
            </a>
          </li>
          <li className={activeItem === "discussions" ? "active" : ""} onClick={() => handleItemClick("discussions")}>
            <a href="#discussions">
              <img src="./src/Atom/icons/icon-discussions.png" alt="Discussões" className="icon" />
              Discussões
            </a>
          </li>
          {/*
          <li className={activeItem === "tags" ? "active" : ""} onClick={() => handleItemClick("tags")}>
            <a href="#tags">
              <img src="./src/Atom/icons/icon-tags.png" alt="Tags" className="icon" />
              Tags
            </a>
          </li>
          */}

          <li className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <a href="#sobre">
              <img src="./src/Atom/icons/icon-sobre.png" alt="Sobre" className="icon" />
              Sobre
            </a>

            {isDropdownVisible && (
              <ul className={`dropdown-menu ${isDropdownVisible ? "visible" : ""}`}>
                <li className={activeItem === "team" ? "active" : ""} onClick={() => handleItemClick("team")}>
                  <a href="/team">
                    <img src="./src/Atom/icons/icon-team.png" alt="Equipe" className="icon" />
                    Equipe
                  </a>
                </li>

                <li
                  className={activeItem === "institutional" ? "active" : ""}
                  onClick={() => handleItemClick("institutional")}
                >
                  <a href="/institutional">
                    <img src="./src/Atom/icons/icon-institution.png" alt="Instituição" className="icon" />
                    Institucional
                  </a>
                </li>
              </ul>
            )}
          </li>
          {/*
          <li className={activeItem === "profile" ? "active" : ""} onClick={() => handleItemClick("profile")}>
            <a href="#profile">
              <img src="./src/Atom/icons/icon-profile.png" alt="Perfil" className="icon" />
              Perfil
            </a>
          </li>
            */}
            
          <li className={activeItem === "saved" ? "active" : ""} onClick={() => handleItemClick("saved")}>
            <a href="#saved">
              <img src="./src/Atom/icons/icon-saved.png" alt="Salvos" className="icon" />
              Salvos
            </a>
          </li>

          <li className={activeItem === "questions" ? "active" : ""} onClick={() => handleItemClick("questions")}>
            <a href="#questions">
              <img src="./src/Atom/icons/icon-questions.png" alt="Suas perguntas" className="icon" />
              Suas perguntas
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;