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

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token não encontrado");
          return;
        }
        // Decodifica o token para extrair o userId
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        // Busca os dados do usuário com base no userId extraído do token
        const data = await userService.getUser(userId);
        setUserData(data);
      } catch (error) {
        console.error("Erro ao carregar os dados do usuário:", error);
      }
    }
    fetchUser();
  }, []);

  if (!userData) return <div>Carregando...</div>;

  // Monta o objeto do usuário com base nos dados retornados pela API
  const user = {
    picture: userData.profilePicture,
    name: userData.firstName, // Você pode concatenar o lastName se desejar
    memberSince: userData.creationDate,
    location: userData.location || "",
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setSaveVisible(true);
  };

  const handleSaveProfile = () => {
    // Validações simples
    if (!user.name.trim()) {
      setNameError("O nome é obrigatório.");
    } else {
      setNameError("");
    }

    if (!user.location.trim()) {
      setLocationError("A localização é obrigatória.");
    } else {
      setLocationError("");
    }

    if (user.name.trim() && user.location.trim()) {
      setIsEditing(false);
      setSaveVisible(false);
      // Aqui, você pode implementar a chamada à API para atualizar o usuário (PUT ou PATCH)
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

          {isEditing && nameError && <span className="error">{nameError}</span>}
          {isEditing && locationError && (
              <span className="error">{locationError}</span>
          )}

          <UserBio
              bio={userData.description}
              isEditing={isEditing}
              // Implemente a edição da bio se desejar
          />

          <SocialMedias
              links={[
                {
                  href: userData.socialMedia[0]?.gitProfile || "",
                  className: "fa fa-github",
                },
                {
                  href: userData.socialMedia[0]?.linkedinProfile || "",
                  className: "fa fa-linkedin-square",
                },
                {
                  href: userData.socialMedia[0]?.instagramProfile || "",
                  className: "fa fa-instagram",
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