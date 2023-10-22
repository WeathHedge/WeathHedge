import {
  formState,
  getWeekNumber,
  inputState,
  median,
  medianY,
  months,
  myColors,
  visualizationModes,
} from "./utils";
import styles from "../styles/form.module.css";

async function getHistoricalData(latitude, longitude, startDate, endDate) {
  const res = await fetch(
    `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,precipitation_sum&timezone=Europe%2FBerlin`
  );
  const msg = await res.json();
  return msg;
}

async function getRecentData(latitude, longitude) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&past_days=7&forecast_days=1&timezone=Europe%2FBerlin`
  );
  const msg = await res.json();
  return msg;
}

export async function getOpenMeteoData(inputState, state, setState) {
  const now = Date.now();
  const todaysDate = now - (now % 86400000);
  const msg = await getHistoricalData(
    inputState.latitude,
    inputState.longitude,
    inputState.startDate,
    inputState.endDate
  );
  let min = [],
    max = [],
    mean = [],
    prec = [];
 
  msg.daily.time.forEach((k, i) => {
    min.push({
      x: new Date(k),
      y: parseFloat(msg.daily.temperature_2m_min[i]),
    });
    max.push({
      x: new Date(k),
      y: parseFloat(msg.daily.temperature_2m_max[i]),
    });
    mean.push({
      x: new Date(k),
      y: parseFloat(msg.daily.temperature_2m_mean[i]),
    });
    prec.push({
      x: new Date(k),
      y: parseFloat(msg.daily.precipitation_sum[i]),
    });
  });
  if (todaysDate - new Date(inputState.endDate).valueOf() <= 604800000) {
    const offset =
      (new Date(inputState.endDate).valueOf() - (todaysDate - 604800000)) /
      (1000 * 60 * 60 * 24);
    const recentData = await getRecentData(
      inputState.latitude,
      inputState.longitude
    );
    recentData.daily.time.forEach((k, i) => {
      if (
        new Date(k).valueOf() < new Date(inputState.startDate).valueOf() ||
        new Date(k).valueOf() > new Date(inputState.endDate).valueOf()
      ) {
        return;
      }
      const index = -offset - 1 + i;
      min[index].y = parseFloat(recentData.daily.temperature_2m_min[i]);
      max[index].y = parseFloat(recentData.daily.temperature_2m_max[i]);
      mean[index].y = (max[index].y + min[index].y) / 2;
      prec[index].y = parseFloat(recentData.daily.precipitation_sum[i]);
    });
  }
  setState({
    ...state,
    tempData: [max, mean, min, prec],
    tempDataMedian: mean.map((e) => ({ x: e.x, y: medianY(mean).y })),
    crosshairValues: [],
    keepCrosshair: false,
    currentVisMode: visualizationModes.Interval,
    formGeoString: `for ${msg.latitude.toFixed(2)}˚N ${msg.longitude.toFixed(
      2
    )}˚E at ${msg.elevation}m above sea level`,
    formTitle: (
      <div className={styles.formTitle}>
        <h1>
          Daily Data between&nbsp;
          <p
            className={styles.highlightText}
            style={{ color: myColors.IconBlue }}
          >
            {inputState.startDate}&nbsp;
          </p>
          and&nbsp;
          <p
            className={styles.highlightText}
            style={{ color: myColors.IconBlue }}
          >
            {inputState.endDate}
          </p>
          .
        </h1>
      </div>
    ),
  });
}

// Other functions remain the same as they are not affected by the conversion.
export async function getDateHistory(inputState, state, setState) {
  const now = Date.now();
  const todaysDate = now - (now % 86400000);
  const msg = await getHistoricalData(
    inputState.latitude,
    inputState.longitude,
    inputState.startDate,
    inputState.endDate
  );

  let min = [],
    max = [],
    mean = [],
    prec = [];

  msg.daily.time.forEach((k, i) => {
    if (k.slice(5) === inputState.targetDate.slice(5)) {
      min.push({
        x: new Date(k),
        y: parseFloat(msg.daily.temperature_2m_min[i]),
      });
      max.push({
        x: new Date(k),
        y: parseFloat(msg.daily.temperature_2m_max[i]),
      });
      mean.push({
        x: new Date(k),
        y: parseFloat(msg.daily.temperature_2m_mean[i]),
      });
      prec.push({
        x: new Date(k),
        y: parseFloat(msg.daily.precipitation_sum[i]),
      });
    }
  });

  if (todaysDate - new Date(inputState.endDate).valueOf() <= 604800000) {
    const recentData = await getRecentData(
      inputState.latitude,
      inputState.longitude
    );
    min[min.length - 1].y = parseFloat(recentData.daily.temperature_2m_min[0]);
    max[max.length - 1].y = parseFloat(recentData.daily.temperature_2m_max[0]);
    mean[mean.length - 1].y =
      (max[max.length - 1].y + min[min.length - 1].y) / 2;
    prec[prec.length - 1].y = parseFloat(recentData.daily.precipitation_sum[0]);
  }

  let avg = mean.reduce((a, b) => a + (b.y || 0), 0) / mean.length;

  setState({
    ...state,
    tempData: [max, mean, min, prec],
    tempDataMedian: mean.map((e) => {
      return { x: e.x, y: medianY(mean).y };
    }),
    tempDataMean: mean.map((e) => {
      return { x: e.x, y: avg || 0 };
    }),
    crosshairValues: [],
    keepCrosshair: false,
    currentVisMode: visualizationModes.DateHistory,
    formGeoString: `for ${msg.latitude.toFixed(2)}˚N ${msg.longitude.toFixed(
      2
    )}˚E at ${msg.elevation}m above sea level`,
    formTitle: (
      <div className={styles.formTitle}>
        <h1>
          History of&nbsp;
          <p
            className={styles.highlightText}
            style={{ color: myColors.IconBlue }}
          >
            {inputState.targetDate.slice(5)}&nbsp;
          </p>
          between&nbsp;
          <p
            className={styles.highlightText}
            style={{ color: myColors.IconBlue }}
          >
            {inputState.startDate}&nbsp;
          </p>
          and&nbsp;
          <p
            className={styles.highlightText}
            style={{ color: myColors.IconBlue }}
          >
            {inputState.endDate}
          </p>
          .
        </h1>
      </div>
    ),
  });
}

export async function getWeekHistory(inputState, state, setState) {
  const now = Date.now();
  const todaysDate = now - (now % 86400000);
  const msg = await getHistoricalData(
    inputState.latitude,
    inputState.longitude,
    inputState.startDate,
    inputState.endDate
  );

  let min = [],
    max = [],
    mean = [],
    prec = [];

  const targetWeek = getWeekNumber(new Date(inputState.targetDate))[1];

  for (let i = 0; i < msg.daily.time.length; i++) {
    const k = msg.daily.time[i];
    const weekInfo = getWeekNumber(new Date(k));
    if (weekInfo[1] === targetWeek) {
      let weekMinData = [],
        weekMaxData = [],
        weekMeanData = [],
        weekPrecData = [];
      for (let j = i; j < i + 7; j++) {
        if (msg.daily.temperature_2m_min[j]) {
          weekMinData.push(parseFloat(msg.daily.temperature_2m_min[j]));
          weekMaxData.push(parseFloat(msg.daily.temperature_2m_max[j]));
          weekMeanData.push(parseFloat(msg.daily.temperature_2m_mean[j]));
          weekPrecData.push(parseFloat(msg.daily.precipitation_sum[j]));
        }
      }
      const xVal = new Date(k);
      min.push({ x: xVal, y: Math.min(...weekMinData) });
      max.push({ x: xVal, y: Math.max(...weekMaxData) });
      mean.push({ x: xVal, y: weekMeanData });
      prec.push({ x: xVal, y: weekPrecData });

      i = i + 6;
    }
  }

  if (todaysDate - new Date(inputState.endDate).valueOf() <= 604800000) {
    const recentData = await getRecentData(
      inputState.latitude,
      inputState.longitude
    );
    const targetWeekData = recentData.daily.time.filter((date, i) => {
      const weekInfo = getWeekNumber(new Date(date));
      return (
        weekInfo[1] === targetWeek &&
        new Date(date).valueOf() >= new Date(inputState.startDate).valueOf()
      );
    });
    targetWeekData.forEach((k, i) => {
      const weekInfo = getWeekNumber(new Date(k));
      if (weekInfo[1] === targetWeek) {
        min[min.length - 1].y = Math.min(
          min[min.length - 1].y,
          parseFloat(recentData.daily.temperature_2m_min[i])
        );
        max[max.length - 1].y = Math.max(
          max[max.length - 1].y,
          parseFloat(recentData.daily.temperature_2m_max[i])
        );
        mean[mean.length - 1].y.push(
          (max[max.length - 1].y + min[min.length - 1].y) / 2
        );
        prec[prec.length - 1].y.push(
          parseFloat(recentData.daily.precipitation_sum[i])
        );
      }
    });
  }

  mean.forEach((d) => {
    d.y = d.y.filter((x) => !Number.isNaN(x));
    d.y = (d.y.reduce((a, b) => a + b, 0) / d.y.length).toFixed(2);
  });

  prec.forEach((d) => {
    d.y = d.y.reduce((a, b) => a + b, 0).toFixed(2);
  });

  setState({
    ...state,
    tempData: [max, mean, min, prec],
    tempDataMedian: mean.map((e) => {
      return { x: e.x, y: medianY(mean).y };
    }),
    crosshairValues: [],
    keepCrosshair: false,
    currentVisMode: visualizationModes.WeekHistory,
    formGeoString: `for ${msg.latitude.toFixed(2)}˚N ${msg.longitude.toFixed(
      2
    )}˚E at ${msg.elevation}m above sea level`,
    formTitle: (
      <div className={styles.formTitle}>
        <h1>
          History of Calender Week&nbsp;
          <p
            className={styles.highlightText}
            style={{ color: myColors.IconBlue }}
          >
            {targetWeek}&nbsp;
          </p>
          between&nbsp;
          <p
            className={styles.highlightText}
            style={{ color: myColors.IconBlue }}
          >
            {inputState.startDate}&nbsp;
          </p>
          and&nbsp;
          <p
            className={styles.highlightText}
            style={{ color: myColors.IconBlue }}
          >
            {inputState.endDate}
          </p>
          .
        </h1>
      </div>
    ),
  });
}

export async function getMonthHistory(inputState, state, setState) {
  const now = Date.now();
  const todaysDate = now - (now % 86400000);
  const msg = await getHistoricalData(
    inputState.latitude,
    inputState.longitude,
    inputState.startDate,
    inputState.endDate
  );

  let min = [],
    max = [],
    mean = [],
    prec = [];

  for (let i = 0; i < msg.daily.time.length; i++) {
    const k = msg.daily.time[i];
    const date = new Date(k);
    const month = k.slice(5).slice(0, -3);
    const year = date.getFullYear();
    if (month === inputState.targetDate.slice(5).slice(0, -3)) {
      if (min.length === 0 || min[min.length - 1].x.getFullYear() !== year) {
        const xVal = date;
        min.push({
          x: xVal,
          y: parseFloat(msg.daily.temperature_2m_min[i]) || Infinity,
        });
        max.push({
          x: xVal,
          y: parseFloat(msg.daily.temperature_2m_max[i] || -Infinity),
        });
        mean.push({
          x: xVal,
          y: [parseFloat(msg.daily.temperature_2m_mean[i])],
        });
        prec.push({ x: xVal, y: [parseFloat(msg.daily.precipitation_sum[i])] });
      } else {
        min[min.length - 1].y = Math.min(
          min[min.length - 1].y,
          parseFloat(msg.daily.temperature_2m_min[i]) || Infinity
        );
        max[max.length - 1].y = Math.max(
          max[max.length - 1].y,
          parseFloat(msg.daily.temperature_2m_max[i]) || -Infinity
        );
        mean[mean.length - 1].y.push(
          parseFloat(msg.daily.temperature_2m_mean[i])
        );
        prec[prec.length - 1].y.push(
          parseFloat(msg.daily.precipitation_sum[i])
        );
      }
    }
  }

  if (todaysDate - new Date(inputState.endDate).valueOf() <= 604800000) {
    const recentData = await getRecentData(
      inputState.latitude,
      inputState.longitude
    );
    const targetMonthData = recentData.daily.time.filter((date, i) => {
      return (
        date.slice(5).slice(0, -3) ===
          inputState.targetDate.slice(5).slice(0, -3) &&
        new Date(date).valueOf() >= new Date(inputState.startDate).valueOf()
      );
    });
    targetMonthData.forEach((k, i) => {
      if (
        k.slice(5).slice(0, -3) === inputState.targetDate.slice(5).slice(0, -3)
      ) {
        min[min.length - 1].y = Math.min(
          min[min.length - 1].y,
          parseFloat(recentData.daily.temperature_2m_min[i])
        );
        max[max.length - 1].y = Math.max(
          max[max.length - 1].y,
          parseFloat(recentData.daily.temperature_2m_max[i])
        );
        mean[mean.length - 1].y.push(
          (max[max.length - 1].y + min[min.length - 1].y) / 2
        );
        prec[prec.length - 1].y.push(
          parseFloat(recentData.daily.precipitation_sum[i])
        );
      }
    });
  }

  mean.forEach((d) => {
    d.y = d.y.filter((x) => !Number.isNaN(x));
    d.y = Number(
      (d.y.reduce((a, b) => a + (b || 0), 0) / d.y.length).toFixed(2)
    );
  });

  prec.forEach((d) => {
    d.y = Number(d.y.reduce((a, b) => a + (b || 0), 0).toFixed(2));
  });

  setState({
    ...state,
    tempData: [max, mean, min, prec],
    tempDataMedian: mean.map((e) => {
      return { x: e.x, y: medianY(mean).y };
    }),
    crosshairValues: [],
    keepCrosshair: false,
    currentVisMode: visualizationModes.MonthHistory,
    formGeoString: `for ${msg.latitude.toFixed(2)}˚N ${msg.longitude.toFixed(
      2
    )}˚E at ${msg.elevation}m above sea level`,
    formTitle: (
      <div className={styles.formTitle}>
        <h1>
          History of Month&nbsp;
          <p
            className={styles.highlightText}
            style={{ color: myColors.IconBlue }}
          >
            {months[Number(inputState.targetDate.slice(5).slice(0, -3))]}&nbsp;
          </p>
          between&nbsp;
          <p
            className={styles.highlightText}
            style={{ color: myColors.IconBlue }}
          >
            {inputState.startDate}&nbsp;
          </p>
          and&nbsp;
          <p
            className={styles.highlightText}
            style={{ color: myColors.IconBlue }}
          >
            {inputState.endDate}
          </p>
          .
        </h1>
      </div>
    ),
  });
}
