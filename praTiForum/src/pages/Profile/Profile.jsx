import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Logo from "../../Atom/Logo/Logo";
import Sidebar from "../../Organism/Sidebar";
import Footer from "../../Molecule/footer/footer";
import UserBio from "../../Organism/User/UserBio";
import UserProfile from "../../Organism/User/UserProfile";
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
  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);

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

  useEffect(() => {
    if (userData) {
      setName(userData.firstName);
      setLocation(userData.location || "");
      setBio(userData.description || "");
      if (userData.socialMedia) {
        setSocialLinks([
          { href: userData.socialMedia.gitProfile || "", className: "fa fa-github" },
          { href: userData.socialMedia.linkedinProfile || "", className: "fa fa-linkedin-square" },
          { href: userData.socialMedia.instagramProfile || "", className: "fa fa-instagram" },
        ]);
      } else {
        setSocialLinks([]);
      }
    }
  }, [userData]);

  if (!userData) return <div>Carregando...</div>;

  // Cria um objeto para dados que não serão alterados (exceto os estados de edição)
  const user = {
    picture: userData.profilePicture,
    memberSince: userData.creationDate,
  };

  const handleEditProfile = () => {
    if (isEditing) {
      setName(userData.firstName);
      setLocation(userData.location || "");
      setIsEditing(false);
      setSaveVisible(false);
    } else {
      setIsEditing(true);
      setSaveVisible(true);
    }
  };

  const handleSaveProfile = async () => {
    console.log("Botão Salvar clicado");
    console.log("Nome:", name, "Localização:", location);

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

        const updatedSocialMedia = {
          gitProfile: socialLinks[0]?.href || "",
          linkedinProfile: socialLinks[1]?.href || "",
          instagramProfile: socialLinks[2]?.href || "",
        };

        const updatedData = {
          ...userData,
          firstName: name,
          lastName: userData.lastName,
          email: userData.email,
          description: bio,
          birthDate: userData.birthDate,
          location: location,
          socialMedia: updatedSocialMedia,
          profilePicture: userData.profilePicture,
        };

        const updatedUser = await userService.updateUser(userId, updatedData);
        setUserData(updatedUser);
        setIsEditing(false);
        setSaveVisible(false);
        console.log("Perfil atualizado com sucesso!");
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
              name={name}
              location={location}
              setName={setName}
              setLocation={setLocation}
              nameError={nameError}
              locationError={locationError}
          />

          <UserBio
              bio={bio}
              socialLinks={socialLinks}
              isEditing={isEditing}
              setBio={setBio}
              setSocialLinks={setSocialLinks}
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