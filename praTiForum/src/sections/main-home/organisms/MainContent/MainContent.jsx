// MainContent.jsx
import React from 'react';
import TitleAndText from '../molecules/TitleAndText/TitleAndText.jsx';
import ButtonGroup from '../molecules/ButtonGroup/ButtonGroup.jsx';
import Image from '../atoms/Image';
import "../MainContent.css";

function MainContent() {
  return (
    <main className="main-content">
      <section className="text-and-buttons">
        <TitleAndText />
        <ButtonGroup />
      </section>
      <Image src="../assets/mais-pra-ti.png" alt="" />
    </main>
  );
}

export default MainContent;