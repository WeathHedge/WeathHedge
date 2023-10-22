import { median, medianY, weatherPoint } from "./utils";

export function leastSquaresLinearRegression(data) {
    const xValues = Array.from(Array(data.length).keys());
    const xMean = xValues.reduce((a, b) => a + (b || 0), 0) / xValues.length;

    const yValues = data.map((d) => Number(d.y));
    const yMean = yValues.reduce((a, b) => a + (b || 0), 0) / yValues.length;

    const xDiffs = xValues.map((x) => x - xMean);
    const yDiffs = yValues.map((y) => y - yMean);

    const xDiffsSquared = xDiffs.map((x) => x * x);

    const xyDiffs = xDiffs.map((x, i) => x * yDiffs[i]);

    const m = xyDiffs.reduce((a, b) => a + b, 0) / xDiffsSquared.reduce((a, b) => a + b, 0);
    const b = yMean - xMean * m;

    const res = data.map((d, i) => ({ x: d.x, y: m * i + b }));
    return res;
}

export function theilSenEstimation(data) {
    let slopes = [];
    const xValues = Array.from(Array(data.length).keys());
    const yValues = data.map((d) => Number(d.y));

    for (let i = 0; i < data.length - 1; i++) {
        for (let j = i + 1; j < data.length; j++) {
            if (i !== j) {
                const m = (yValues[j] - yValues[i]) / (j - i);
                slopes.push(m);
            }
        }
    }

    const medSlope = median(slopes);

    let vals = [];
    for (let i = 0; i < data.length; i++) {
        const v = yValues[i] - medSlope * i;
        vals.push(v);
    }

    const b = median(vals);

    const res = data.map((d, i) => ({ x: d.x, y: medSlope * i + b }));
    return res;
}
