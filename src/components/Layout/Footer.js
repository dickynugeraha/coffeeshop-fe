import React from "react";
import classes from "./Footer.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes["footer-content"]}>
        <h3 className="title">Casper and Luna</h3>
        <p>
          Jl. Ibnu Armah No.55A, Pangkalan Jati Baru, Kec. Cinere, Kota Depok,
          Jawa Barat.
        </p>
        <p>Open (10:00 - 22:00) WIB</p>
        <ul className={classes.socials}>
          <li>
            <a href="https://www.instagram.com/_casperluna/?hl=id">
              <FontAwesomeIcon icon={faInstagram} className={classes.icon} />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/casperandluna/">
              <FontAwesomeIcon icon={faFacebook} className={classes.icon} />
            </a>
          </li>
        </ul>
      </div>
      <div className={classes["footer-bottom"]}>
        <p>
          Copyright &copy;2022 Web Developer, <span>Dicky Nugeraha</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
