import React from "react";
import FormLegend from "./legend";

export function PlotControls({ formId, formHook, state, setState, width }) {
  const selfRemove = () => {
    formHook[1](formHook[0].filter((i) => i !== formId));
  };

  return (
    <div className="figureControls">
      <FormLegend state={state} setState={setState} />
      {formHook[0].length > 1 ? (
        <button type="button" onClick={selfRemove}>
          — Remove series
        </button>
      ) : null}
    </div>
  );
}
