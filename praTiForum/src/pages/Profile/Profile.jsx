import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Logo from "../../Atom/Logo/Logo";
import Sidebar from "../../Organism/Sidebar";
import Footer from "../../Molecule/footer/footer";
import UserBio from "../../Organism/User/UserBio";
import UserProfile from "../../Organism/User/UserProfile";
import SocialMedias from "../../Molecule/SocialMedias/SocialMedias";
import SaveButton from "../../Atom/button/SaveButton";
import userService from "../../services/userService";

import "./ProfilePage.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveVisible, setSaveVisible] = useState(false);
  const [nameError, setNameError] = useState("");
  const [locationError, setLocationError] = useState("");

  // Estados para os campos editáveis
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token não encontrado");
          return;
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        const data = await userService.getUser(userId);
        setUserData(data);
      } catch (error) {
        console.error("Erro ao carregar os dados do usuário:", error);
      }
    }
    fetchUser();
  }, []);

  // Atualiza os estados dos campos editáveis quando os dados do usuário são carregados
  useEffect(() => {
    if (userData) {
      setName(userData.firstName);
      setLocation(userData.location || "");
    }
  }, [userData]);

  if (!userData) return <div>Carregando...</div>;

  // Objeto para exibição no componente UserProfile
  const user = {
    picture: userData.profilePicture,
    name: userData.firstName,
    memberSince: userData.creationDate,
    location: userData.location || "",
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setSaveVisible(true);
  };

  const handleSaveProfile = async () => {
    // Validações simples
    if (!name.trim()) {
      setNameError("O nome é obrigatório.");
    } else {
      setNameError("");
    }

    if (!location.trim()) {
      setLocationError("A localização é obrigatória.");
    } else {
      setLocationError("");
    }

    if (name.trim() && location.trim()) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token não encontrado");
          return;
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        // Mescla os dados atuais com os campos atualizados.
        const updatedData = {
          ...userData, // Inclui todos os atributos atuais do usuário
          firstName: name, // Atualiza o nome
          location: location, // Atualiza a localização (caso faça parte do modelo)
        };

        // Chama o endpoint de atualização com os dados completos
        const updatedUser = await userService.updateUser(userId, updatedData);
        // Atualiza o estado com os dados retornados pela API
        setUserData(updatedUser);
        setIsEditing(false);
        setSaveVisible(false);
      } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
      }
    }
  };

  return (
      <div className="page-container">
        <Logo />
        <Sidebar />
        <main className="user-profile">
          <UserProfile
              user={user}
              isEditing={isEditing}
              handleEditProfile={handleEditProfile}
          />

          {isEditing && (
              <div className="edit-fields">
                <label>
                  Nome:
                  <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  />
                </label>
                {nameError && <span className="error">{nameError}</span>}

                <label>
                  Localização:
                  <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                  />
                </label>
                {locationError && <span className="error">{locationError}</span>}
              </div>
          )}

          <UserBio
              bio={userData.description}
              isEditing={isEditing}
              // Implemente a edição da bio se desejar
          />

          <SocialMedias
              links={[
                {
                  href: userData.socialMedia?.gitProfile || "",
                  className: "fa fa-github",
                },
                {
                  href: userData.socialMedia?.linkedinProfile || "",
                  className: "fa fa-linkedin-square",
                },
                {
                  href: userData.socialMedia?.instagramProfile || "",
                  className: "fa fa-instagram",
                },
                {
                  href: userData.socialMedia?.discordProfile || "",
                  className: "fa fa-discord",
                },
              ]}
              isEditing={isEditing}
              // Implemente a edição dos links se desejar
          />

          {saveVisible && (
              <SaveButton id="save-profile" onClick={handleSaveProfile}>
                Salvar
              </SaveButton>
          )}
        </main>
        <Footer />
      </div>
  );
};

export default Profile;