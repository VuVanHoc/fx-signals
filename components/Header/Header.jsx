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
        <h1 className={styles.h1}>Forex Signals</h1>
        <p className={styles.headerContent}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled
        </p>
      </div>
    </div>
  );
}

export default Header;
