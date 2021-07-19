import Logo from "../Logo";
import NavBar from "../NavBar";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Logo />
        <NavBar />
      </div>
      <div className={styles.subContainer}>
        <h1 className={styles.h1}>FX-Crypto Signal</h1>
        <p className={styles.headerContent}>
          {`Simple Forex-crypto signals with more than 70% prediction accuracy`}
        </p>
      </div>
    </div>
  );
}

export default Header;
