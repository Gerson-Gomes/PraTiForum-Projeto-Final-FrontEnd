import React from "react";
import Text from "../../Atom/paragraph/Text";
import SocialMedias from "../../Molecule/SocialMedias/SocialMedias";
import SaveButton from "../../Atom/button/SaveButton";

const UserBio = ({ bio, socialLinks, isEditing, setBio }) => (
  <div className="user-bio">
    {isEditing ? (
      <textarea id="user-bio-input" value={bio} onChange={(e) => setBio(e.target.value)} />
    ) : (
      <Text id="user-bio-text">{bio}</Text>
    )}
    <SocialMedias links={socialLinks} />
  </div>
);

export default UserBio;