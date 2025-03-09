import "./HeaderLogado.css";
import InputSearch from "../../../Atom/input/InputSearch";
import Logo from "../../../Atom/Logo/Logo";
import ProfilePicture from "../../../Atom/perfil/ProfilePicture";
import profile  from "../../../Atom/icons/icon-profile.png"
import MenuMobile from "../../MenuMobile/MenuMobile";


function HeaderLogado() {
  return (
    <nav className="headerLogado">
      <MenuMobile showProfileIcon={true} />
      <Logo className="headerLogo" />
      <div>
        <InputSearch label="" tipo="text" placeholder="Pesquisar" className="search" />
      </div>
      <div className="header-perfil">
        <ProfilePicture src={profile} alt="Logo" size={50}/>            
      </div>
    </nav>
  );
}

export default HeaderLogado;
