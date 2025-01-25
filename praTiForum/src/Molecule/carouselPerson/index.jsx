import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./styles.css";

const CarouselPerson = () => {
  const sliderRef = useRef(null);

  const teamMembers = [
    {
      name: "Gabrielly Silva",
      image: "src/assets/images/gabrielly.jpeg",
      linkedin: "https://www.linkedin.com/in/gabrielly-silva",
      github: "https://github.com/gabrielly",
    },
    {
      name: "Gerson Gomes",
      image: "src/assets/images/gerson.png",
      linkedin: "https://www.linkedin.com/in/gabrielly-silva",
      github: "https://github.com/gabrielly",
    },
    {
      name: "Luis Furtado",
      image: "src/assets/images/luis.jpg",
      linkedin: "https://www.linkedin.com/in/gabrielly-silva",
      github: "https://github.com/gabrielly",
    },
    {
      name: "Miller Santiago",
      image: "src/assets/images/miller linkedin (1).png",
      linkedin: "https://www.linkedin.com/in/gabrielly-silva",
      github: "https://github.com/gabrielly",
    },
    {
      name: "Nicolly Almeida",
      image: "src/assets/images/nicolly.png",
      linkedin: "https://www.linkedin.com/in/gabrielly-silva",
      github: "https://github.com/gabrielly",
    },
    {
      name: "Pedro Vitor",
      image: "src/assets/images/pedro.png",
      linkedin: "https://www.linkedin.com/in/gabrielly-silva",
      github: "https://github.com/gabrielly",
    },
    {
      name: "Teofilo Nicolau",
      image: "src/assets/images/nicolau.jpeg",
      linkedin: "https://www.linkedin.com/in/gabrielly-silva",
      github: "https://github.com/gabrielly",
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
          <div key={index} className="membro-equipe">
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
    </div>
  );
};

export default CarouselPerson;
