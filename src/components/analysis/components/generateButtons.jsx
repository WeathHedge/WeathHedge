import React, { useState, useEffect } from "react";
import {
  getDateHistory,
  getMonthHistory,
  getOpenMeteoData,
  getWeekHistory,
} from "../shared/openMeteoInterface";
import styles from "../styles/form.module.css";

export function GenerateButtons({
  state,
  setState,
  inputState,
  inputValidation,
  setLoadingState,
}) {
  const validateIntervalInput = () => {
    const ltTenYears =
      Number(inputState.endDate.slice(0, 4)) -
        Number(inputState.startDate.slice(0, 4)) <=
      10;
    return (
      inputValidation.lat &&
      inputValidation.long &&
      inputValidation.start &&
      inputValidation.end &&
      ltTenYears
    );
  };

  const validateDateInput = () => {
    const validInterval =
      new Date(inputState.startDate).valueOf() <
        new Date(inputState.endDate).valueOf() &&
      Number(inputState.startDate.slice(0, 4)) >= 1940 &&
      Date.parse(inputState.endDate) - Date.now() < 0;
    return (
      inputValidation.lat &&
      inputValidation.long &&
      (inputState.targetDate ? true : false) &&
      validInterval
    );
  };


  useEffect(() =>{
 runHistoryDataForLocation();
  }, [inputState])

  const runHistoryDataForLocation = async  () => {
      if(inputState.latitude !== undefined && inputState.longitude !== undefined){
          setLoadingState(true);
          await getDateHistory(inputState, state, setState);
          setLoadingState(false)
    }
  }

  return (
    <div className={styles.generateButtons}>
      <p>Show Data For:</p>
      <button
        type="button"
        className={
          state.currentVisMode === "DateHistory"
            ? styles.activatedMode
            : undefined
        }
        onClick={async () => {
          setLoadingState(true);
          await getDateHistory(inputState, state, setState);
          setLoadingState(false);
        }}
        disabled={!validateDateInput()}
      >
        History of Target Date
      </button>
      <button
        type="button"
        className={
          state.currentVisMode === "WeekHistory"
            ? styles.activatedMode
            : undefined
        }
        onClick={async () => {
          setLoadingState(true);
          await getWeekHistory(inputState, state, setState);
          setLoadingState(false);
        }}
        disabled={!validateDateInput()}
      >
        History of Target Week
      </button>
      <button
        type="button"
        className={
          state.currentVisMode === "MonthHistory"
            ? styles.activatedMode
            : undefined
        }
        onClick={async () => {
          setLoadingState(true);
          await getMonthHistory(inputState, state, setState);
          setLoadingState(false);
        }}
        disabled={!validateDateInput()}
      >
        History of Target Month
      </button>
      <button
        type="button"
        className={
          state.currentVisMode === "Interval" ? styles.activatedMode : undefined
        }
        onClick={async () => {
          setLoadingState(true);
          await getOpenMeteoData(inputState, state, setState);
          setLoadingState(false);
        }}
        disabled={!validateIntervalInput()}
      >
        Whole Interval (max 10 years)
      </button>
    </div>
  );
}
