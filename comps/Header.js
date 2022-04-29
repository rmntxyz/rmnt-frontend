import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Header() {
  return (
    <nav className={styles.header}>
      <div className={styles.icon}>
        <Link href="/">
          <h1>Rarement</h1>
        </Link>
      </div>
      <div className={styles.button}>
        <Link href="/">Connect Wallet</Link>
      </div>
    </nav>
  );
}
