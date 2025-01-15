import React from "react";
import Sidebar from "../../Organism/Sidebar";
import Footer from "../../Molecule/footer/footer";
import UserBio from "../../Organism/User/UserBio";

const UserProfile = () => {
  const user = {
    picture: "/image 31.png",
    name: "Sofia Monteiro",
    memberSince: "03/2024",
    location: "Gravataí - RS",
  };

  const bio =
    "Estudante de desenvolvimento front-end com foco em criar interfaces modernas e responsivas. Atualmente, estou aprofundando meus conhecimentos em HTML, CSS, JavaScript e React. Nos meus momentos livres, gosto de ler e jogar videogames. 👾💗";

  const socialLinks = [
    { href: "", className: "fa fa-github" },
    { href: "", className: "fa fa-linkedin-square" },
    { href: "", className: "fa fa-instagram" },
  ];

  return (
    <>
      <Sidebar />
      <section className="user-profile">
        {/* Organismos */}
        <UserProfile user={user} />
        <UserBio bio={bio} socialLinks={socialLinks} />
      </section>
      <Footer />
    </>
  );
};

export default UserProfile;
