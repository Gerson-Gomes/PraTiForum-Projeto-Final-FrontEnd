import React from "react";
import "./ProfilePicture.css";

const ProfilePicture = ({ src, alt = "Foto de perfil", size = 100 }) => {
  return (
    <div
      className="profile-picture"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      {src ? (
        <img src={src} alt={alt} style={{ width: "100%", height: "100%" }} />
      ) : (
        <div className="placeholder">
          <span>?</span>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;

