import React, { useState, useEffect } from "react";
import Logo from "../../Atom/Logo/Logo";
import Sidebar from "../../Organism/Sidebar";
import Footer from "../../Molecule/footer/footer";
import UserBio from "../../Organism/User/UserBio";
import UserProfile from "../../Organism/User/UserProfile";
import SocialMedias from "../../Molecule/SocialMedias/SocialMedias";
import UserImage from "../../Atom/image/user-image.png";
import SaveButton from "../../Atom/button/SaveButton";

import "./ProfilePage.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [saveVisible, setSaveVisible] = useState(false);

  const [name, setName] = useState(() => {
    const savedName = localStorage.getItem("name");
    return savedName ? savedName : ""; // valor padrão caso não haja no localStorage
  });

  const [location, setLocation] = useState(() => {
    const savedLocation = localStorage.getItem("location");
    return savedLocation ? savedLocation : ""; // valor padrão caso não haja no localStorage
  });

  const [bio, setBio] = useState(
    "Estudante de desenvolvimento front-end com foco em criar interfaces modernas e responsivas. Atualmente, estou aprofundando meus conhecimentos em HTML, CSS, JavaScript e React. Nos meus momentos livres, gosto de ler e jogar videogames. 👾💗"
  );

  const [socialLinks, setSocialLinks] = useState(() => {
    const savedLinks = localStorage.getItem("socialLinks");
    return savedLinks
      ? JSON.parse(savedLinks)
      : [
          { href: "", className: "fa fa-github" },
          { href: "", className: "fa fa-linkedin-square" },
          { href: "", className: "fa fa-instagram" },
        ];
  });

  const [nameError, setNameError] = useState("");
  const [locationError, setLocationError] = useState("");

  const user = {
    picture: UserImage,
    name,
    memberSince: "03/2024",
    location,
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setSaveVisible(true);
  };

  const handleSaveProfile = () => {
    // Verificar se nome e localização foram preenchidos
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

    // Se não houver erros, salva o perfil
    if (name.trim() && location.trim()) {
      setIsEditing(false);
      setSaveVisible(false);

      // Salvar nome e localização no localStorage quando o perfil for salvo
      localStorage.setItem("name", name);
      localStorage.setItem("location", location);

      // Salvar os links no localStorage quando o perfil for salvo
      localStorage.setItem("socialLinks", JSON.stringify(socialLinks));
    }
  };

  useEffect(() => {
    if (name) localStorage.setItem("name", name);
  }, [name]);

  useEffect(() => {
    if (location) localStorage.setItem("location", location);
  }, [location]);

  useEffect(() => {
    if (socialLinks.length > 0) {
      localStorage.setItem("socialLinks", JSON.stringify(socialLinks));
    }
  }, [socialLinks]);

  return (
    <>
      <div className="page-container">
        <Logo />
        <Sidebar />
          <main className="user-profile">
            <UserProfile
              user={user}
              isEditing={isEditing}
              handleEditProfile={handleEditProfile}
              setName={setName}
              setLocation={setLocation}
            />

            {isEditing && nameError && (
              <span className="error">{nameError}</span>
            )}

            {isEditing && locationError && (
              <span className="error">{locationError}</span>
            )}

            <UserBio bio={bio} isEditing={isEditing} setBio={setBio} />
            <SocialMedias
              links={socialLinks}
              isEditing={isEditing}
              setLinks={setSocialLinks}
            />
            {saveVisible && (
              <SaveButton id="save-profile" onClick={handleSaveProfile}>
                Salvar
              </SaveButton>
            )}
          </main>
          <Footer />
      </div>
    </>
  );
};

export default Profile;
