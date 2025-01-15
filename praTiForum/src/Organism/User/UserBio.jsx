import React from "react";
import Text from "../../Atom/paragraph/Text";
import SocialMedias from "../../Molecule/SocialMedias/SocialMedias";
import SaveButton from "../../Atom/button/SaveButton";

const UserBio = ({ bio, socialLinks }) => (
  <div className="user-bio">
    <Text id="user-bio-text">{bio}</Text>
    <textarea id="user-bio-input" style={{ display: "none" }}></textarea>
    <SocialMedias links={socialLinks} />
    <SaveButton id="save-profile" style={{ display: "none" }}>
      Salvar
    </SaveButton>
  </div>
);

export default UserBio;
