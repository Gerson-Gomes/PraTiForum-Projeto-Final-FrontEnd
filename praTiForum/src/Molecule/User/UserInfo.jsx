import React from "react";
import Icon from "../../Atom/icons/Icon";
import Text from "../../Atom/paragraph/Text";

const UserInfo = ({
                      name,
                      memberSince,
                      location,
                      isEditing,
                      setName,
                      setLocation,
                      nameError,
                      locationError,
                  }) => (
    <div className="user-info">
        {isEditing ? (
            <>
                <input
                    type="text"
                    id="user-name-input"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {nameError && <span className="error-message">{nameError}</span>}
            </>
        ) : (
            <h3 id="user-name">{name}</h3>
        )}

        <div className="user-data">
            <Icon className="fa fa-user" style={{ color: "#3d3d3d" }} />
            <Text>Membro desde {memberSince}</Text>
        </div>

        <div className="user-data">
            <Icon className="fa fa-map-marker" style={{ color: "#3d3d3d" }} />
            {isEditing ? (
                <>
                    <input
                        type="text"
                        id="user-location-input"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    {locationError && <span className="error-message">{locationError}</span>}
                </>
            ) : (
                <Text id="user-location">{location}</Text>
            )}
        </div>
    </div>
);

export default UserInfo;