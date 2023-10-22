import React from "react";

export default function FormLegend({ state, setState }) {
    const ITEMS = [
        { title: 'Max', color: "#FF0000", disabled: !state.showMax },
        { title: 'Mean', color: "#008000", disabled: !state.showMean },
        { title: 'Min', color: "#0000FF", disabled: !state.showMin },
        { title: 'Median', color: "#FFFF00", disabled: !state.showMedian },
        { title: 'Trend Lines', color: 'black', strokeStyle: "dashed", disabled: !state.showTrend },
    ];

    const _clickHandler = (item) => {
        item.disabled = !item.disabled;
        if (item.title === 'Max') {
            setState({ ...state, showMax: !state.showMax });
        }
        else if (item.title === 'Mean') {
            setState({ ...state, showMean: !state.showMean });
        }
        else if (item.title === 'Min') {
            setState({ ...state, showMin: !state.showMin });
        }
        else if (item.title === 'Median') {
            setState({ ...state, showMedian: !state.showMedian });
        }
        else if (item.title === 'Trend Lines') {
            setState({ ...state, showTrend: !state.showTrend });
        }
    };

    return (
        <div className="formLegend">
            {ITEMS.map((item, index) => (
                <div key={index} onClick={() => _clickHandler(item)}>
                    <span>{item.title}</span>
                </div>
            ))}
        </div>
    );
}
