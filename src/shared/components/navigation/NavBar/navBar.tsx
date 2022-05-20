import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./navBar.css";
import Logo from "./img/logo-min.png";
import NavBarImage from "./img/navBarImg-min.png";
import { APP_URL } from "../constants";
import { Icon } from "shared/components/ui";
import { css } from "@emotion/react";

const addCaseIconCss = (theme: any) => css`
  color: ${theme.palette.background.lightBlue};
`;

const isSelectedCss = css`
  background-color: rgba(35, 47, 104, 0.3);
`;

const NavBar: React.FC = () => {
  const location = useLocation();

  const isSelected = (path: string) => location.pathname === path;
  return (
    <div className="navigation">
      <div className="navigation__logo-container">
        <img className="logo" src={Logo} alt="logo" />
        <p className="logo-text">Metrics</p>
      </div>
      <div className="navigation__links-container">
        <div className="links-container__link-container">
          <Icon name="AddCircleOutline" css={addCaseIconCss} />
          <Link
            className="link"
            to={APP_URL.addCase}
            css={isSelected(APP_URL.addCase) && isSelectedCss}
          >
            Добавить кейс
          </Link>
        </div>
        <div className="links-container__link-container">
          <Icon name="List" css={addCaseIconCss} />
          <Link
            className="link"
            to={APP_URL.savedCases}
            css={isSelected(APP_URL.savedCases) && isSelectedCss}
          >
            Мои задания
          </Link>
        </div>
      </div>
      <div className="nav-bar-img-container">
        <img className="nav-bar-img" src={NavBarImage} alt="navBarImage" />
      </div>
    </div>
  );
};

export default NavBar;
