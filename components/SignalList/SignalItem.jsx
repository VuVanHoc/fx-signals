import styles from "./SignalList.module.css";
import ArrowUp from "../../assets/icons/ArrowUp.svg";
import ArrowDown from "../../assets/icons/ArrowDown.svg";
import Image from "next/image";
import cx from "classnames";
import moment from "moment";
import { useMemo } from "react";

export default function SignalItem({ signal = {} }) {
  const {
    type,
    periodType,
    dataType,
    entry,
    closed,
    status,
    profit,
    date,
    dateText,
    tp1,
    tp2,
    tp3,
  } = signal;

  const timeGapDuration = useMemo(() => {
    return new Date().getTime() - date;
  }, [date]);

  return (
    <div className={styles.containerItem}>
      <div className={styles.signalItemColumnLeft}>
        {type === "SHORT" ? (
          <div className={styles.flexCenter}>
            <Image src={ArrowDown} alt="Sell" height={20} />
            <span className={styles.redColor}>SELL</span>
          </div>
        ) : (
          <div className={styles.flexCenter}>
            <Image src={ArrowUp} alt="Buy" height={20} />
            <span className={styles.greenColor}>BUY</span>
          </div>
        )}
        <p
          className={cx({ [styles.yellowColor]: true })}
          style={{ marginTop: 12, marginBottom: 12 }}
        >
          EURUSD
        </p>
        <p className={styles.dateTime}>{moment(date).format("YYYY/MM/DD")}</p>
        <p className={styles.dateTime}>{moment(date).fromNow(false)}</p>
      </div>
      <div className={styles.signalItemColumnRight}>
        <div className={styles.flexCenter}>
          <p className={styles.labelSignalItem}>Entry</p>
          <p className={cx({ [styles.value]: true })}>
            {entry ? entry.toFixed(3) : "-"}
          </p>
        </div>
        <div className={styles.flexCenter}>
          <p className={styles.labelSignalItem}>Closed</p>
          <p className={cx({ [styles.value]: true })}>
            {closed ? closed.toFixed(3) : "-"}
          </p>
        </div>
        <div className={styles.flexCenter}>
          <p className={styles.labelSignalItem}>Profit</p>
          <p
            className={cx({
              [styles.value]: true,
              [styles.redColor]: profit < 0,
              [styles.greenColor]: profit >= 0,
            })}
          >
            {profit ? profit.toFixed(3) : "-"}
          </p>
        </div>
        {/* <div className={styles.flexCenter}>
          <p className={styles.labelSignalItem}>TP 3</p>
          <p className={cx({ [styles.value]: true })}>{tp3 || "-"}</p>
        </div> */}
        <div className={styles.flexCenter}>
          <p className={styles.labelSignalItem}>SL</p>
          <p className={cx({ [styles.value]: true })}>{`-`}</p>
        </div>
      </div>
    </div>
  );
}
