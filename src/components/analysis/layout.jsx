import React from "react";
import "./styles/globals.css";
import "./fonts.css";
import styles from "./styles/layout.module.css";

export const metadata = {
  title: "Daily Weather History",
  description:
    "Visualize and compare historical weather data for any geolocation.",
};

export default function RootLayout(props) {
  const { children } = props;
  return (
    <html className={styles.container} lang="en">
      <body>{children}</body>
    </html>
  );
}
