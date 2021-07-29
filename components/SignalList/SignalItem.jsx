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
    <div
      className={cx(styles.containerItem, {
        [styles.containerItemActive]: status === "OPEN",
      })}
    >
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
          {dataType}
        </p>
        <p className={styles.dateTime}>{moment(date).format("YYYY/MM/DD")}</p>
        <p className={styles.dateTime}>{moment(date).fromNow(false)}</p>
      </div>
      <div className={styles.signalItemColumnRight}>
        <div className={styles.flexCenter}>
          <p className={styles.labelSignalItem}>Date</p>
          <p className={cx({ [styles.value]: true })}>
            {date ? moment(date).format("HH:mm DD-MMM-YYYY") : "-"}
          </p>
        </div>
        <div className={styles.flexCenter}>
          <p className={styles.labelSignalItem}>Entry</p>
          <p className={cx({ [styles.value]: true })}>
            {entry ? entry.toFixed(2) : "-"}
          </p>
        </div>
        <div className={styles.flexCenter}>
          <p className={styles.labelSignalItem}>
            {status === "OPEN" ? `Current` : `Closed`}
          </p>
          <p className={cx({ [styles.value]: true })}>
            {closed ? closed.toFixed(2) : "-"}
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
            {profit ? profit.toFixed(2) : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
