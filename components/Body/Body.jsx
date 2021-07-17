import SignalList from "../SignalList/SignalList";
import styles from "./Body.module.css";

export default function Body() {
  return (
    <div className={styles.container}>
      <SignalList />
    </div>
  );
}
