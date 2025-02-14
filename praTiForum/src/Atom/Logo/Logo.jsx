import logo from "../../../src/assets/images/logo-maisprati-forum.svg";
import "./logo.css";

function Logo() {
  return (
    <div className="header-logo">
    <img src={logo} alt="Logo" />
    </div>
  );
}

export default Logo;