import styles from "./SignalList.module.css";
import ArrowUp from "../../assets/icons/ArrowUp.svg";
import ArrowDown from "../../assets/icons/ArrowDown.svg";
import Image from "next/image";
import cx from "classnames";
import moment from "moment";
import { useMemo } from "react";
import { MAP_STATUS, MAP_STATUS_ICON, SIGNAL_STATUS } from "../../Constant";

export default function ForexSignalItem({ signal = {} }) {
  const { type, symbol, entry, status, profit, dateMils, sL, tP1, tP2, tP3 } =
    signal;

  return (
    <div
      className={cx(styles.containerItem, {
        [styles.containerItemActive]: status === "OPEN",
      })}
    >
      <div
        className={cx(
          styles.signalItemColumnLeft,
          styles.signalItemColumnLeftForexSignal
        )}
      >
        <div>
          {type === "SELL" ? (
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
            {symbol}
          </p>
          <p className={styles.dateTime}>
            {moment(dateMils).format("YYYY/MM/DD")}
          </p>
          <p className={styles.dateTime}>{moment(dateMils).fromNow(false)}</p>
        </div>
        <div>
          <p
            className={cx(
              { [styles.greenColor]: status !== SIGNAL_STATUS.HIT_SL },
              { [styles.redColor]: status === SIGNAL_STATUS.HIT_SL }
            )}
            style={{ marginTop: 12, marginBottom: 12 }}
          >
            {MAP_STATUS[status]}
            <br />
            {MAP_STATUS_ICON[status]}
          </p>
        </div>
      </div>
      <div className={styles.signalItemColumnRight}>
        <div className={styles.flexCenter}>
          <p
            className={cx(
              styles.labelSignalItem,
              styles.labelSignalItemForexSignal
            )}
          >
            Date
          </p>
          <p className={cx({ [styles.value]: true })}>
            {dateMils ? moment(dateMils).format("HH:mm DD-MMM-YYYY") : "-"}
          </p>
        </div>
        <div className={styles.flexCenter}>
          <p
            className={cx(
              styles.labelSignalItem,
              styles.labelSignalItemForexSignal
            )}
          >
            Entry
          </p>
          <p className={cx({ [styles.value]: true })}>
            {entry ? entry.toFixed(2) : "-"}
          </p>
        </div>
        <div className={styles.flexCenter}>
          <p
            className={cx(
              styles.labelSignalItem,
              styles.labelSignalItemForexSignal
            )}
          >
            Take Profit 1
          </p>
          <p className={cx({ [styles.value]: true }, styles.greenColor)}>
            {tP1 ? tP1.toFixed(2) : "-"}
          </p>
        </div>
        <div className={styles.flexCenter}>
          <p
            className={cx(
              styles.labelSignalItem,
              styles.labelSignalItemForexSignal
            )}
          >
            Take Profit 2
          </p>
          <p className={cx({ [styles.value]: true }, styles.greenColor)}>
            {tP2 ? tP2.toFixed(2) : "-"}
          </p>
        </div>
        <div className={styles.flexCenter}>
          <p
            className={cx(
              styles.labelSignalItem,
              styles.labelSignalItemForexSignal
            )}
          >
            Take Profit 3
          </p>
          <p className={cx({ [styles.value]: true }, styles.greenColor)}>
            {tP3 ? tP3.toFixed(2) : "-"}
          </p>
        </div>
        <div className={styles.flexCenter}>
          <p
            className={cx(
              styles.labelSignalItem,
              styles.labelSignalItemForexSignal
            )}
          >
            Stoploss
          </p>
          <p className={cx({ [styles.value]: true }, styles.redColor)}>
            {sL ? sL.toFixed(2) : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
