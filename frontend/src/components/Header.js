import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
        <div
          className="header__logo"
          src={props.src}
          alt="Логотип Mesto Russia"
        ></div>
        <div className="header__wrapper">
          <p className="header__email">{props.login}</p>
          <Link
            to={props.link}
            onClick={props.onClick}
            className={`${props.loggedIn && "header__link_out"} header__link`}
          >
            {props.headerText}
          </Link>
        </div>
    </header>
  );
}
export default Header;
