// MainContent.jsx
import React from 'react';
import TitleAndText from '../../molecules/TitleAndText/TitleAndText';
import ButtonGroup from '../../molecules/ButtonGroup/ButtonGroup';
import Image from '../../atoms/image/Image';
import maisPraTi from '../../assets/mais-pra-ti.png';
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