import logo from "../../assets/fampaylogo.svg";

import "./Header.styles.css";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} className="logo" alt="logo" />
    </header>
  );
};

export default Header;
