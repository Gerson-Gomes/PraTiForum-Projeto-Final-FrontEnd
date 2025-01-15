import React from "react";
import Icon from "../../Atom/icons/Icon"
import Text from "../../Atom/paragraph/Text";

const UserInfo = ({ name, memberSince, location }) => (
  <div className="user-info">
    <h3 id="user-name">{name}</h3>
    <div className="user-data">
      <Icon className="fa fa-user" style={{ color: "#3d3d3d" }} />
      <Text>Membro desde {memberSince}</Text>
    </div>
    <div className="user-data">
      <Icon className="fa fa-map-marker" style={{ color: "#3d3d3d" }} />
      <Text id="user-location">{location}</Text>
    </div>
  </div>
);