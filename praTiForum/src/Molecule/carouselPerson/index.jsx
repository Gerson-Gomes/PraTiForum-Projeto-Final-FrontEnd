import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./styles.css";
import Curriculum from "../curriculum/Curriculum";

const CarouselPerson = () => {
  const sliderRef = useRef(null);
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      name: "Gabrielly Silva",
      image: "src/assets/images/gabrielly.jpeg",
      linkedin: "https://www.linkedin.com/in/gabrielly-silva",
      github: "https://github.com/gabrielly",
      role: "Desenvolvedora FullStack",
      location: "Pernambuco",
      description: "Apaixonada por tecnologia e inovação."
    },
    {
      name: "Gerson Gomes",
      image: "src/assets/images/gerson.png",
      linkedin: "https://www.linkedin.com/in/gersoncgomes/",
      github: "https://github.com/Gerson-Gomes",
      role: "Desenvolvedor FullStack",
      location: "Bahia",
      description: "Apaixonado por tecnologia e inovação."
    },
    {
      name: "Halisson Cavalcante",
      image: "src/assets/images/halisson.jpeg",
      linkedin: "https://www.linkedin.com/in/halisson-cavalcante-b52514234?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/HalissonC10",
      role: "Desenvolvedor BackEnd",
      location: "Ceará",
      description: "Apaixonado por tecnologia e inovação."
    },
    {
      name: "Luis Furtado",
      image: "src/assets/images/luis.jpg",
      linkedin: "https://www.linkedin.com/in/luis-furtado-673426168/",
      github: "https://github.com/LuisFurtado27",
      role: "Desenvolvedor FullStack",
      location: "Rio Grande do Sul",
      description: "Apaixonado por tecnologia e inovação."
    },
    {
      name: "Miller Santiago",
      image: "src/assets/images/miller linkedin (1).png",
      linkedin: "https://www.linkedin.com/in/millersantiago/",
      github: "https://github.com/miller110",
      role: "Desenvolvedor FullStack",
      location: "Bahia",
      description: "Apaixonado por tecnologia e inovação."
    },
    {
      name: "Nicolly Almeida",
      image: "src/assets/images/nicolly.png",
      linkedin: "https://www.linkedin.com/in/nicolly-almeida/",
      github: "https://github.com/devnicolly",
      role: "Desenvolvedora FrontEnd",
      location: "Rio de Janeiro",
      description: "20 anos, estudante de Análise e Desenvolvimento de Sistemas.\n Apaixonada por tecnologia e inovação. "
    },
    {
      name: "Pedro Vitor",
      image: "src/assets/images/pedro.png",
      linkedin: "https://www.linkedin.com/in/pedro-vitor-emanuel50/",
      github: "https://github.com/pedrofrs",
      role: "Desenvolvedor FullStack",
      location: "Pernambuco",
      description: "Apaixonado por tecnologia e inovação."
    },
    {
      name: "Teofilo Nicolau",
      image: "src/assets/images/nicolau.jpeg",
      linkedin: "https://www.linkedin.com/in/teofilo-nicolau/",
      github: "https://github.com/teofilonicolau",
      role: "Desenvolvedor BackEnd",
      location: "Ceará",
      description: "Apaixonado por tecnologia e inovação."
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1400,
    speed: 1300,
    adaptiveHeight: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
        },
      },
  
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container-carousel">
      <button
        className="carousel-button prev"
        onClick={() => sliderRef.current.slickPrev()}
      >
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      </button> 

      <Slider {...sliderSettings} ref={sliderRef} className="container-slick">
        {teamMembers.map((member, index) => (
          <div key={index} className="membro-equipe" onClick={() => setSelectedMember(member)}>
            <figure>
              <img src={member.image} alt={`Foto de ${member.name}`} />
              <figcaption>{member.name}</figcaption>
            </figure>
            <div className="social-icons">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="icon"
              >
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="icon"
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
            </div>
          </div>
        ))}
      </Slider>

      <button
        className="carousel-button next"
        onClick={() => sliderRef.current.slickNext()}
      >
        <FontAwesomeIcon icon={faArrowRight} size="2x" />
      </button>

      {selectedMember && (
        <Curriculum member = {selectedMember} onClose ={() => setSelectedMember(null)} />
      )}
    </div>
  );
};

export default CarouselPerson;
