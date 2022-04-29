import {
  faInstagram,
  faTwitter,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function () {
  return (
    <div className={styles.footerBox}>
      <footer className={styles.footer}>
        <div className={styles.footerItem}>
          <div className={styles.icon}>
            <Link href="/">
              <FontAwesomeIcon icon={faInstagram} size="2x"></FontAwesomeIcon>
            </Link>
          </div>
          <div className={styles.icon}>
            <Link href="/">
              <FontAwesomeIcon icon={faTwitter} size="2x"></FontAwesomeIcon>
            </Link>
          </div>
          <div className={styles.icon}>
            <Link href="/">
              <FontAwesomeIcon icon={faDiscord} size="2x"></FontAwesomeIcon>
            </Link>
          </div>
          <div className={styles.icon}>
            <Link href="/">
              <FontAwesomeIcon icon={faEnvelope} size="2x"></FontAwesomeIcon>
            </Link>
          </div>
        </div>
        <div className={styles.footerItem}>
          <div className={styles.icon}>
            <Link href="/">FAQ</Link>
          </div>
          <div className={styles.icon}>
            <Link href="/">terms of service</Link>
          </div>
          <div className={styles.icon}>
            <Link href="/">privacy policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
