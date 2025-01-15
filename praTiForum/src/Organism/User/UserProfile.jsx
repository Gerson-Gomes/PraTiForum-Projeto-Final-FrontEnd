import React from "react";
import Avatar from "../../Atom/profile/Avatar";
import UserInfo from "../../Molecule/User/UserInfo";
import Icon from "../../Atom/icons/Icon";

const UserProfile = ({ user }) => (
  <div className="user-profile-container">
    <div className="user-picture-info">
      <Avatar src={user.picture} alt="Foto de perfil" />
      <input
        type="file"
        id="upload-picture"
        accept="image/*"
        style={{ display: "none" }}
      />
      <UserInfo
        name={user.name}
        memberSince={user.memberSince}
        location={user.location}
      />
      <div className="edit-profile">
        <Icon
          className="fa fa-pencil"
          style={{ color: "#3d3d3d", cursor: "pointer" }}
          id="edit-profile"
        />
      </div>
    </div>
  </div>
);

export default UserProfile;