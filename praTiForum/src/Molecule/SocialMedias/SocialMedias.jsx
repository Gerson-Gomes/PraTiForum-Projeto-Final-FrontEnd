import React from "react";
import Icon from "../../Atom/icons/Icon"

const SocialMedias = ({ links }) => (
  <div className="user-social-medias">
    {links.map(({ href, className }, index) => (
      <a href={href} key={index}>
        <Icon
          className={className}
          style={{ fontSize: 24, color: "#3d3d3d" }}
        />
      </a>
    ))}
  </div>
);

export default SocialMedias;