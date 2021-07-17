import styles from "./SignalList.module.css";
import { useMemo, useState, useCallback, useEffect } from "react";
import cx from "classnames";
import axios from "axios";
import ReactLoading from "react-loading";
import SignalItem from "./SignalItem";

export default function SignalList() {
  const tabs = useMemo(
    () => [
      { title: "BTC", value: 0 },
      { title: "XAU", value: 1 },
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
      switch (tabIndex) {
        case 0:
          dataType = "BTCUSDT";
          break;
        case 1:
          dataType = "XAUUSD";
          break;
      }
      const res = await axios.get(
        `http://54.179.120.86:8080/hungcr-signal/api/data/signals?data=${dataType}`
      );
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
        <div className={styles.contentTab}>
          {loading ? (
            <div className={styles.loading}>
              <ReactLoading type="bars" color="#fbc02d" />
            </div>
          ) : (
            <div className={styles.signalList}>
              {signals?.map((signal, index) => (
                <SignalItem signal={signal} key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
