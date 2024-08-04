import React from "react";
import styles from "@/styles/Footer.module.css"; // Import the CSS module

function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className="flex flex-col">
          <div className={styles.footerLogoSection}>
            <img
              src="/steam/steamicon/Valve_logo_grey.png"
              alt="Valve Logo"
              className={styles.footerLogo}
            />
            <img
              src="/steam/steamicon/New_Steam_Logo_with_name_grey.png"
              alt="Steam Logo"
              className={styles.footerLogo}
            />
          </div>
          <div className={styles.footerInfo}>
            <p>
              &copy; {currentYear} Valve Corporation. All rights reserved.
              <br />
              All trademarks are property of their respective owners in the US
              and other countries.
              <br />
              VAT included in all prices where applicable.
            </p>
          </div>
        </div>
        <div className={styles.footerLinks}>
          <ul>
            <li>
              <a href="#">About Valve</a>
            </li>
            <li>
              <a href="#">Jobs</a>
            </li>
            <li>
              <a href="#">Steamworks</a>
            </li>
            <li>
              <a href="#">Steam Distribution</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Legal</a>
            </li>
            <li>
              <a href="#">Steam Subscriber Agreement</a>
            </li>
            <li>
              <a href="#">Refunds</a>
            </li>
            <li>
              <a href="#">Cookies</a>
            </li>
          </ul>
        </div>
        <div className={styles.footerSocial}>
          <a href="#">
            <img src="/steam/steamicon/facebook.png" alt="Facebook" />
          </a>
          <a href="#">
            <img src="/steam/steamicon/twitter.png" alt="Twitter" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
