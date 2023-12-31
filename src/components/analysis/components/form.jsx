import React, { useEffect, useState } from "react";
import "../../../../node_modules/react-vis/dist/style.css";
import styles from "../styles/form.module.css";
import {
  inputState,
  inputValidation,
  visualizationModes,
  formState,
} from "../shared/utils";
import { InputSpace } from "./inputSpace";
import { GenerateButtons } from "./generateButtons";
import {
  getDateHistory,
  getMonthHistory,
  getOpenMeteoData,
  getWeekHistory,
} from "../shared/openMeteoInterface";
import FigureSpace from "./figureSpace";

export default function Form({ formId, formHook }) {
  const todaysDate = new Date();

  const [inputState, setInputState] = useState({
    latitude: undefined,
    longitude: undefined,
    targetDate: todaysDate.toISOString().slice(0, -14),
    startDate: "1940-01-01",
    endDate: todaysDate.toISOString().slice(0, -14),
  });

  const [inputValidation, setInputValidation] = useState({
    lat: false,
    long: false,
    target: true,
    start: true,
    end: true,
  });

  const [state, setState] = useState({
    tempData: [
      [{ x: todaysDate, y: 20 }],
      [{ x: todaysDate, y: 20 }],
      [{ x: todaysDate, y: 20 }],
      [{ x: todaysDate, y: 20 }],
    ],
    tempDataMedian: [],
    tempDataMean: [],
    crosshairValues: [],
    showMin: true,
    showMax: true,
    showMean: true,
    showMedian: false,
    showPrec: false,
    showTrend: true,
    keepCrosshair: false,
    formTitle: <h1>Select a visualization</h1>,
    formGeoString: "",
    currentVisMode: null,
  });

  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    const triggerCurrentVisMode = async () => {
      let inputCheck = { ...inputValidation };
      const validInterval =
        new Date(inputState.startDate).valueOf() <
          new Date(inputState.endDate).valueOf() &&
        Number(inputState.startDate.slice(0, 4)) >= 1940 &&
        Date.parse(inputState.endDate) - todaysDate.valueOf() < 0;

      inputCheck.lat =
        !Number.isNaN(inputState.latitude) && inputState.latitude !== undefined;
      inputCheck.long =
        !Number.isNaN(inputState.longitude) &&
        inputState.longitude !== undefined;
      !inputState.targetDate
        ? (inputCheck.target = false)
        : (inputCheck.target = true);
      inputCheck.start = validInterval;
      inputCheck.end = validInterval;

      if (state.currentVisMode === visualizationModes.Interval) {
        inputCheck.target = true;
        const ltTenYears =
          Number(inputState.endDate.slice(0, 4)) -
            Number(inputState.startDate.slice(0, 4)) <=
          10;
        inputCheck.start = validInterval && ltTenYears;
        inputCheck.end = validInterval && ltTenYears;

        if (Object.values(inputCheck).reduce((a, b) => a && b, true)) {
          setLoadingState(true);
          await getOpenMeteoData(inputState, state, setState);
          setLoadingState(false);
        }
      } else if (Object.values(inputCheck).reduce((a, b) => a && b, true)) {
        if (state.currentVisMode === visualizationModes.DateHistory) {
          setLoadingState(true);
          await getDateHistory(inputState, state, setState);
          setLoadingState(false);
        } else if (state.currentVisMode === visualizationModes.WeekHistory) {
          setLoadingState(true);
          await getWeekHistory(inputState, state, setState);
          setLoadingState(false);
        } else if (state.currentVisMode === visualizationModes.MonthHistory) {
          setLoadingState(true);
          await getMonthHistory(inputState, state, setState);
          setLoadingState(false);
        }
      }
      setInputValidation(inputCheck);
    };
    triggerCurrentVisMode();
  }, [inputState]);

  return (
    <div className={styles.form}>
      <InputSpace
        inputState={inputState}
        setInputState={setInputState}
        inputValidation={inputValidation}
      />
      <GenerateButtons
        state={state}
        setState={setState}
        inputState={inputState}
        inputValidation={inputValidation}
        setLoadingState={setLoadingState}
      />
      {state.formTitle}
      <p>{state.formGeoString}</p>
      <h4>
        Click on the series to freeze/unfreeze the tooltip. Drag to zoom in on a
        period.
      </h4>
      <FigureSpace
        formId={formId}
        formHook={formHook}
        state={state}
        setState={setState}
        loadingState={loadingState}
      />
    </div>
  );
}
