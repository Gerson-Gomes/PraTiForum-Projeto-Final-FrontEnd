import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft, faArrowRight, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Curriculum.css";

const Curriculum = ({ member, onClose }) => {
    if (!member) return null; // Se não houver membro selecionado, não exibe nada
  
    return (
        <div className="mini-curriculo-overlay">
        <div className="mini-curriculo">
            <button className="expand-button" onClick={onClose}>
                <img src="src/assets/images/Vector.png" alt="Fechar" className="close-icon"/>
            </button>
    
            <div className="profile-container">
                <img src={member.image} alt={member.name} className="profile-image" />
                <div className="profile-info">
                    <h2 className="name">{member.name}</h2>
                    <p className="role">{member.role}  
                        <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="icon">
                            <FontAwesomeIcon icon={faLinkedin} size="2x" />
                        </a>
                         <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="icon">
                            <FontAwesomeIcon icon={faGithub} size="2x" />
                        </a>
                    </p>
                        
                    <p className="location">
                        <FontAwesomeIcon icon={faMapMarkerAlt} />{member.location}
                    </p>
                </div>
            </div>
    
            <p className="description">{member.description.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ))}
            </p>
        </div>
    </div>
    );
  };


export default Curriculum;
