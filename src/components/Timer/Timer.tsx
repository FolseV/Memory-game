import React, { useCallback, useEffect, useState } from "react";
import useTypedSelector from "../../hooks";
import { useActions } from "../../hooks/useActions";
import styles from "./Timer.module.css";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const Timer = () => {
  const { theme } = useTypedSelector((state) => state.theme);

  const { toggleTimer, resetTimerToggle } = useTypedSelector((state) => state.timer);
  const { resetTimer, readTime } = useActions();
  const [countTime, setCountTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<number>(0);

  const handleStartTime = useCallback(() => {
    let interval: number = window.setInterval(() => {
      setCountTime((prev) => prev + 10);
    }, 10);
    setIntervalId(interval);
  }, [setCountTime]);

  const handleStopTime = useCallback(() => {
    readTime(countTime);
    clearInterval(intervalId);
  }, [intervalId, countTime, readTime]);

  const handleResetTime = useCallback(() => {
    clearInterval(intervalId);
    setCountTime(0);
  }, [intervalId]);

  const checkTimer = useCallback(() => {
    if (toggleTimer) {
      handleStartTime();
    } else {
      handleStopTime();
    }
    if (resetTimerToggle) {
      handleResetTime();
      resetTimer();
    }
  }, [handleResetTime, handleStartTime, handleStopTime, resetTimer, resetTimerToggle, toggleTimer]);

  useEffect(() => {
    checkTimer();
    return function cleanup() {
      handleResetTime();
    };
    // eslint-disable-next-line
  }, [toggleTimer]);

  return (
    <div>
      <div
        className={cx({
          timer: theme,
        })}
      >
        <span>{("0" + Math.floor((countTime / 60000) % 60)).slice(-2)}:</span>
        <span className={styles.digits}>
          {("0" + Math.floor((countTime / 1000) % 60)).slice(-2)}.
        </span>
        <span className={styles.digitsMiliSec}>{("0" + ((countTime / 10) % 100)).slice(-2)} </span>
      </div>
    </div>
  );
};

export default Timer;
