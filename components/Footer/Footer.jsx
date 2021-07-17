import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className={styles.container}>
      <p className={styles.p}>
        © {year} <b style={{ color: "#fff" }}>ForexSignals</b>. All rights
        reserved.
      </p>
      <ul className={styles.ul}>
        <li>
          <Link href="/terms-of-service">
            <a className={styles.a}>Terms of Service</a>
          </Link>
        </li>
        <li>
          <Link href="/privacy-policy">
            <a className={styles.a}>Privacy Policy</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
