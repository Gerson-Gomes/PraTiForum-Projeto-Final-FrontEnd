// MainContent.jsx
import React from "react";
import TitleAndText from "../Molecule/TitleAndText/TitleAndText";
import ButtonGroup from "../Molecule/ButtonGroup/ButtonGroup";
import Image from "../Atom/image/Image";
import maisPraTi from "../assets/Images/mais-pra-ti.png";
import "./MainContent.css";


function MainContent() {
  return (
    <main className="main-content">
      <section className="text-and-buttons">        
        <TitleAndText />
        <ButtonGroup />
      </section>
      <Image src={maisPraTi} alt="" />
    </main>
  );
}

export default MainContent;
