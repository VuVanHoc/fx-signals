import styles from "./SignalList.module.css";
import { useMemo, useState, useCallback, useEffect } from "react";
import cx from "classnames";
import axios from "axios";
import ReactLoading from "react-loading";
import SignalItem from "./SignalItem";

export default function SignalList() {
  const tabs = useMemo(
    () => [
      { title: "BTC D1", value: 0 },
      { title: "BTC H4", value: 1 },
      { title: "BTC H1", value: 2 },
      { title: "GOLD D1", value: 3 },
      { title: "GOLD H4", value: 4 },
      { title: "GOLD H1", value: 5 },
    ],
    []
  );
  const [tabIndex, setTabIndex] = useState(0);
  const [signals, setSignal] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSignals = useCallback(async (tabIndex) => {
    setLoading(true);
    try {
      let dataType = "BTCUSDT";
      let periodType = "D";

      switch (tabIndex) {
        case 0:
          dataType = "BTCUSDT";
          periodType = "D";
          break;
        case 1:
          dataType = "BTCUSDT";
          periodType = "H4";
          break;
        case 2:
          dataType = "BTCUSDT";
          periodType = "H1";
          break;
        case 3:
          dataType = "XAUUSD";
          periodType = "D";
          break;
        case 4:
          dataType = "XAUUSD";
          periodType = "H4";
          break;
        case 5:
          dataType = "XAUUSD";
          periodType = "H1";
          break;
      }
      const params = {
        data: dataType,
        period: periodType,
        accessKey: "qtYBtVSy8q",
      };

      const res = await axios.get(
        `https://be.fx-signal.club/fx-signal/api/data/signals`,
        {
          params: params,
        }
      );
      // const res = await axios.get(
      //   `http://54.179.120.86:8080/hungcr-signal/api/data/signals`,
      //   {
      //     params: params,
      //   }
      // );
      if (res) {
        setLoading(false);
        setSignal(res.data || []);
      }
    } catch (error) {
      setLoading(true);
    }
  }, []);
  const handleClickTab = useCallback(
    (value) => {
      setTabIndex(value);
      fetchSignals(value);
    },
    [setTabIndex, fetchSignals]
  );
  const sortByDate = (array) => {
    return array.sort((a, b) => (a.date > b.date ? -1 : 1));
  };

  const totalSignalWon = useMemo(
    () => signals?.filter((signal) => signal.profit > 0)?.length,
    [signals]
  );
  const totalSignalLost = useMemo(
    () => signals?.filter((signal) => signal.profit < 0)?.length,
    [signals]
  );
  const totalWon = useMemo(
    () =>
      signals
        ?.filter((signal) => signal.profit > 0)
        ?.reduce((acc, signal) => acc + signal.profit, 0),
    [signals]
  );

  const totalLost = useMemo(
    () =>
      signals
        ?.filter((signal) => signal.profit < 0)
        ?.reduce((acc, signal) => acc + signal.profit, 0) * -1,
    [signals]
  );
  useEffect(() => {
    fetchSignals(0);
  }, [fetchSignals]);
  return (
    <div className={styles.container}>
      {/* Title */}
      <p className={styles.title}>
        <b>SIGNALS</b> LIST
      </p>
      <div className={styles.line}></div>

      {/* Tab section */}
      <div className={styles.tabSection}>
        <div className={styles.headerTab}>
          <div className={styles.tabs}>
            {tabs.map((tab, index) => {
              return (
                <div
                  onClick={() => handleClickTab(tab.value)}
                  key={index}
                  className={cx({
                    [styles.tabItem]: true,
                    [styles.tabItemActive]: tab.value === tabIndex,
                  })}
                >
                  {tab.title}
                </div>
              );
            })}
          </div>
          {/* Add date picker here */}
          <div className={styles.datePicker}></div>
        </div>
        <div className={cx(styles.flexCenter, styles.summaryDiv)}>
          <p
            className={cx(styles.numberSummary, styles.greenColor)}
          >{`Won = ${totalSignalWon}, `}</p>
          <p
            className={cx(styles.numberSummary, styles.redColor)}
          >{`Lost = ${totalSignalLost}`}</p>
          <p
            className={cx(styles.numberSummary, {
              [styles.greenColor]: totalWon - totalLost > 0,
              [styles.redColor]: totalWon - totalLost < 0,
            })}
          >{` | Profit = ${Number(totalWon - totalLost).toFixed(2)}`}</p>
        </div>
        <div className={styles.contentTab}>
          {loading ? (
            <div className={styles.loading}>
              <ReactLoading type="bars" color="#fbc02d" />
            </div>
          ) : (
            <div className={styles.signalList}>
              {sortByDate(signals)?.map((signal, index) => (
                <SignalItem signal={signal} key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
