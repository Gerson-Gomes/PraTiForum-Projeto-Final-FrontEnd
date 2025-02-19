import React from "react";
import Avatar from "../../Atom/profile/Avatar";
import UserInfo from "../../Molecule/User/UserInfo";
import Icon from "../../Atom/icons/Icon";

const UserProfile = ({ user, isEditing, handleEditProfile, setName, setLocation }) => (
  <div className="user-profile-container">
    <div className="user-picture-info">
      <div >
        <div className="picture-container" > 
          <Avatar src={user.picture} alt="Foto de perfil" />
        </div>
        <div className="editPictureHover">
          <p>Editar foto</p>
        </div>
      </div>
      {/* <input
        type="file"
        id="upload-picture"
        accept="image/*"
        style={{ display: "none" }}
      /> */}
      <UserInfo
        name={user.name}
        memberSince={user.memberSince}
        location={user.location}
        isEditing={isEditing}
        setName={setName}
        setLocation={setLocation}
      />
      <div className="edit-profile">
        <Icon
          className="fa fa-pencil"
          style={{ color: "#3d3d3d", cursor: "pointer" }}
          id="edit-profile"
          onClick={handleEditProfile}
        />
      </div>
    </div>
  </div>
);

export default UserProfile;