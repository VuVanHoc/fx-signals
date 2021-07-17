import Link from "next/link";

import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <h1 className={styles.logo}>
      <Link href="/">FXSignals</Link>
    </h1>
  );
}
