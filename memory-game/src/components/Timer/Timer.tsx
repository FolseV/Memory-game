import React, { useCallback, useEffect, useState } from "react";
import useTypedSelector from "../../hooks";
import { useActions } from "../../hooks/useActions";
import styles from "./Timer.module.css";

const Timer = () => {
  const { toggleTimer, resetTimerToggle } = useTypedSelector((state) => state.timer);
  const { resetTimer, readTime } = useActions();
  //   console.log("render timer");
  const [countTime, setCountTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<number>(0);

  const handleStartTime = useCallback(() => {
    let interval: number = window.setInterval(() => {
      //window.setInterval
      setCountTime((prev) => prev + 10);
    }, 10);
    setIntervalId(interval);
  }, [setCountTime]);

  const handleStopTime = useCallback(() => {
    readTime(countTime);
    clearInterval(intervalId);
    // console.log(typeof countTime);
  }, [intervalId, countTime, readTime]);

  const handleResetTime = useCallback(() => {
    clearInterval(intervalId);
    setCountTime(0);
  }, [intervalId]);

  const checkTimer = useCallback(() => {
    // console.log("object");
    if (toggleTimer) {
      handleStartTime();
    } else {
      handleStopTime();
    }
    if (resetTimerToggle) {
      handleResetTime();
      // гдето вызывается ресет и он срабатывает 4 раза
      resetTimer();
    }
  }, [handleResetTime, handleStartTime, handleStopTime, resetTimer, resetTimerToggle, toggleTimer]);

  useEffect(() => {
    console.log("render TIMER");
    // readTime(countTime);
    checkTimer();
  }, [toggleTimer]);

  return (
    <div>
      <div className={styles.timer} style={{ color: "white" }}>
        <span className={styles.digits}>
          {("0" + Math.floor((countTime / 60000) % 60)).slice(-2)}:
        </span>
        <span className={styles.digits} style={{ color: "white" }}>
          {("0" + Math.floor((countTime / 1000) % 60)).slice(-2)}.
        </span>
        <span className={styles.digitsMiliSec} style={{ color: "white" }}>
          {("0" + ((countTime / 10) % 100)).slice(-2)}{" "}
        </span>
        <button onClick={() => handleStartTime()}>start</button>
        <button onClick={() => handleStopTime()}>stop</button>
        <button onClick={() => handleResetTime()}>reset</button>
      </div>
    </div>
  );
};

export default Timer;
