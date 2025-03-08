import React from "react";


const Avatar = ({ src, alt, onClick }) => (
  <img id="profile-picture" src={src} alt={alt} onClick={onClick  } />
);

export default Avatar;