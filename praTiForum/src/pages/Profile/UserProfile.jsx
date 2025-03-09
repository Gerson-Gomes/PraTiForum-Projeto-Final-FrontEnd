import React from "react";
import "./UserProfile.css"; // Caso tenha estilos específicos

const UserProfile = ({ user, isEditing, handleEditProfile }) => {
  return (
      <div className="user-profile-container">
        <img
            src={user.picture}
            alt="Foto do usuário"
            className="profile-picture"
        />
        <h2>{user.name}</h2>
        <p>Membro desde: {user.memberSince}</p>
        {user.location && <p>Localização: {user.location}</p>}
        {!isEditing && (
            <button onClick={handleEditProfile} className="edit-button">
              Editar Perfil
            </button>
        )}
      </div>
  );
};

export default UserProfile;
