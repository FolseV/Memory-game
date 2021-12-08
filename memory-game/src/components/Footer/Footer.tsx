import React from "react";
import copyRight from "../../img/copyright.svg";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer}>
        <img className={styles.footerImg} src={copyRight} alt="copyright" />
        <p className={styles.footerText}> created by Vlad Folse</p>
      </div>
    </footer>
  );
};

export default Footer;
