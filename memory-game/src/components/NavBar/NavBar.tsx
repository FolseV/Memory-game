import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../img/logo.svg";
import ThemeButton from "../ThemeButton";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <header>
      <ul className={styles.navigationBar}>
        <li>
          <NavLink to="/greetings" end className={({ isActive }) => (isActive ? "true" : "false")}>
            <img src={logo} alt="logo" className={styles.navBarLogo}></img>
          </NavLink>
        </li>
        <li>
          <NavLink to="/home" end className={({ isActive }) => (isActive ? "true" : "false")}>
            <p className={styles.nav}>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/leaderboard"
            end
            className={({ isActive }) => (isActive ? "true" : "false")}
          >
            <p className={styles.nav}>Leaderboard</p>
          </NavLink>
        </li>
        <ThemeButton />
      </ul>
    </header>
  );
};

export default NavBar;
