import "./HeaderLogado.css";
import InputSearch from "../../../Atom/input/InputSearch";
import Logo from "../../../Atom/Logo/Logo";
import ProfilePicture from "../../../Atom/perfil/ProfilePicture";
import MenuMobile from "../../MenuMobile/MenuMobile";
import profileDefault from "../../../Atom/icons/icon-profile.png"
import { useNavigate } from "react-router-dom";



function HeaderLogado() {
  const navigate = useNavigate()
  return (
    <nav className="headerLogado">
      <MenuMobile showProfileIcon={true} />
      <Logo className="headerLogo" />
      <div>
        <InputSearch label="" tipo="text" placeholder="Pesquisar" className="search" />
      </div>
      <div className="header-perfil">
        <button id="perfilButton" onClick={() => navigate("/perfil-usuario${userId}")}>
          <ProfilePicture src={profileDefault} alt="Logo" size={50} />
        </button>
      </div>

    </nav>

  );
}

export default HeaderLogado;
