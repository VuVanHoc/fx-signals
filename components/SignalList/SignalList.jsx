import styles from "./SignalList.module.css";
import { useMemo, useState, useCallback, useEffect } from "react";
import cx from "classnames";
import ReactLoading from "react-loading";
import SignalItem from "./SignalItem";
import api from "../../api";
import ForexSignalItem from "./ForexSignalItem";
import { MAP_STATUS, MAP_STATUS_ICON, SIGNAL_STATUS } from "../../Constant";

const FX_SIGNAL_TYPE = "FX_SIGNAL";
export default function SignalList() {
  // const tabs = useMemo(
  //   () => [
  //     { title: "BTC H1", value: 0 },
  //     { title: "BTC H4", value: 1 },
  //     { title: "BTC D", value: 2 },
  //     { title: "GOLD H1", value: 3 },
  //     // { title: "GOLD H4", value: 4 },
  //     { title: "GOLD D", value: 5 },
  //   ],
  //   []
  // );
  const [tabIndex, setTabIndex] = useState(""); // This is display name of tab.
  const [signals, setSignal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState([]);

  const fetchSignals = useCallback(async (tab) => {
    if (!tab) return;
    setLoading(true);
    try {
      if (tab.type === FX_SIGNAL_TYPE) {
        const params = {
          accessKey: sessionStorage.getItem("accessKey"),
        };

        const res = await api.get(`/forexSignals`, {
          params: params,
        });

        if (res) {
          setLoading(false);
          setSignal(res.data || []);
        }
      } else {
        let dataType = tab?.type;
        let periodType = tab?.periodType;

        const params = {
          data: dataType,
          period: periodType,
          accessKey: sessionStorage.getItem("accessKey"),
        };

        const res = await api.get(`/signals`, {
          params: params,
        });

        if (res) {
          setLoading(false);
          setSignal(res.data || []);
        }
      }
    } catch (error) {
      setLoading(true);
    }
  }, []);
  const handleClickTab = useCallback(
    (tab) => {
      setTabIndex(tab);
      fetchSignals(tab);
    },
    [setTabIndex, fetchSignals]
  );
  const sortByDate = (array) => {
    if (tabIndex?.type === FX_SIGNAL_TYPE) {
      return array.sort((a, b) => (a.dateMils > b.dateMils ? -1 : 1));
    }
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
  const fetchListLabel = useCallback(async () => {
    try {
      const res = await api.get(`/labels`);
      if (res) {
        setTabs([
          {
            name: "FX Signals",
            type: FX_SIGNAL_TYPE,
            periodType: "ALL",
          },
          ...res.data,
        ]);
        handleClickTab(res.data?.[0]);
      }
    } catch (error) {}
  }, [setTabs, handleClickTab]);
  useEffect(() => {
    fetchListLabel();
  }, [fetchListLabel]);

  // useEffect(() => {
  // fetchSignals(0);
  // }, [fetchSignals]);
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
                  onClick={() => handleClickTab(tab)}
                  key={index}
                  className={cx({
                    [styles.tabItem]: true,
                    [styles.tabItemActive]: tab.name === tabIndex?.name,
                  })}
                >
                  {tab.name}
                </div>
              );
            })}
          </div>
          {/* Add date picker here */}
          <div className={styles.datePicker}></div>
        </div>
        {tabIndex?.type === FX_SIGNAL_TYPE ? (
          <div className={cx(styles.flexCenter, styles.summaryDiv)}>
            <p
              className={cx(styles.numberSummary, styles.greenColor)}
            >{`TP 1 = ${
              signals?.filter((signal) => signal.status === SIGNAL_STATUS.TP1)
                ?.length
            }, `}</p>
            <p
              className={cx(styles.numberSummary, styles.greenColor)}
            >{`TP 2 = ${
              signals?.filter((signal) => signal.status === SIGNAL_STATUS.TP2)
                ?.length
            }, `}</p>
            <p
              className={cx(styles.numberSummary, styles.greenColor)}
            >{`TP 3 = ${
              signals?.filter((signal) => signal.status === SIGNAL_STATUS.TP3)
                ?.length
            }, `}</p>
            <p className={cx(styles.numberSummary, styles.redColor)}>{`SL = ${
              signals?.filter(
                (signal) => signal.status === SIGNAL_STATUS.HIT_SL
              )?.length
            }`}</p>
          </div>
        ) : (
          <div className={cx(styles.flexCenter, styles.summaryDiv)}>
            <p
              className={cx(styles.numberSummary, styles.greenColor)}
            >{`Won = ${totalSignalWon}, `}</p>
            <p
              className={cx(styles.numberSummary, styles.redColor)}
            >{`Lost = ${totalSignalLost}`}</p>
            <p className={cx(styles.numberSummary, styles.greenColor)}>
              <span>{`   |   `}</span>
              {`Win rate = ${
                totalSignalWon + totalSignalLost !== 0
                  ? Math.round(
                      (totalSignalWon * 100) /
                        (totalSignalWon + totalSignalLost)
                    )
                  : 0
              }%`}
            </p>
            <p
              className={cx(styles.numberSummary, {
                [styles.greenColor]: totalWon - totalLost > 0,
                [styles.redColor]: totalWon - totalLost < 0,
              })}
            >
              <span className={styles.hiddenOnMobile}>{`   |   `}</span>
              {`Profit = ${Number(totalWon - totalLost).toFixed(2)}`}
            </p>
          </div>
        )}

        <div className={styles.contentTab}>
          {loading ? (
            <div className={styles.loading}>
              <ReactLoading type="bars" color="#fbc02d" />
            </div>
          ) : (
            <div className={styles.signalList}>
              {sortByDate(signals)?.map((signal, index) =>
                tabIndex?.type === FX_SIGNAL_TYPE ? (
                  <ForexSignalItem signal={signal} key={index} />
                ) : (
                  <SignalItem signal={signal} key={index} />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
