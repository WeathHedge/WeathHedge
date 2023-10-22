import React from "react";
import FormComparer from "./components/formComparer";
import Layout from "./layout";

export default function Tth() {
  return (
    React.createElement(Layout, null,
      React.createElement(FormComparer, null)
    )
  );
}
