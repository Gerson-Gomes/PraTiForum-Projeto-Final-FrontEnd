import "./HeaderMain.css";
import ButtonGroupHeader from "../../ButtonGroupHeader/ButtonGroupHeader";
import InputSearch from "../../../Atom/input/InputSearch";
import Logo from "../../../Atom/Logo/Logo";

function HeaderMain() {
  return (
    <nav className="header">
      <Logo />
      <div className="">
        <InputSearch label="" tipo="text" placeholder="Pesquisar" className="" />
      </div>
      <div className="header-buttons">
        <ButtonGroupHeader />
      </div>
    </nav>
  );
}

export default HeaderMain;
