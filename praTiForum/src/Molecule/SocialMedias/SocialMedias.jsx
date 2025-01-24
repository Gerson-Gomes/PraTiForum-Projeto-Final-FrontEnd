import React from "react";
import Icon from "../../Atom/icons/Icon";

const SocialMedias = ({ links = [], isEditing, setLinks }) => {
  const handleLinkChange = (index, event) => {
    const newLinks = [...links]; // Cria uma cópia dos links para não modificar diretamente
    newLinks[index].href = event.target.value; // Atualiza o valor do link correspondente
    setLinks(newLinks); // Chama a função setLinks que foi passada como prop para atualizar o estado no pai
  };

  return (
    <div className={`user-social-medias ${isEditing ? 'column' : ''}`}>
      {Array.isArray(links) && links.map(({ href, className }, index) => (
        <div key={index} className="social-media-item">
          {href && !isEditing && (
            <a href={href} style={{ display: 'block' }}>
              <Icon className={className} style={{ fontSize: 24, color: "#3d3d3d" }} />
            </a>
          )}
          
          {isEditing && (
            <div className="social-input-container">
              <Icon className={className} style={{ fontSize: 24, color: "#3d3d3d" }} />
              <input
                type="text"
                value={href} 
                onChange={(e) => handleLinkChange(index, e)} 
                placeholder={`URL da rede social ${index + 1}`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SocialMedias;
