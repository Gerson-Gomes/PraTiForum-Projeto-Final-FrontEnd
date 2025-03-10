import React from "react";
import Text from "../../Atom/paragraph/Text";
import SocialMedias from "../../Molecule/SocialMedias/SocialMedias";

const UserBio = ({ bio, socialLinks, isEditing, setBio, setSocialLinks }) => (
    <div className="user-bio">
        {isEditing ? (
            <textarea
                id="user-bio-input"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />
        ) : (
            <Text id="user-bio-text">{bio}</Text>
        )}
        <SocialMedias
            links={socialLinks}
            isEditing={isEditing}
            setLinks={setSocialLinks}
        />
    </div>
);

export default UserBio;
