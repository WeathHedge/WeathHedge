import { useState, useEffect } from "react";
import React from "react";
import CollapsibleMap from "./collapsibleMap";
import styles from "../styles/form.module.css";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export function InputSpace({ inputState, setInputState, inputValidation }) {
  const [center, setCenter] = useState([50.8, 6.1]);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setInputState({
            ...inputState,
            latitude: Number(position.coords.latitude.toFixed(7)),
            longitude: Number(position.coords.longitude.toFixed(7)),
          });
          setCenter([position.coords.latitude, position.coords.longitude]);
        }, (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.log('User denied the request for Geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              console.error('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              console.error('The request to get user location timed out.');
              break;
            case error.UNKNOWN_ERROR:
              console.error('An unknown error occurred.');
              break;
            default:
              console.error('An error occurred:', error.message);
          }
        }
      );
    }else {
      console.error('Geolocation is not supported by this browser.');
    }
  };



  return (
    <div className={styles.inputSpace}>
      <div className={styles.settings}>
        <form className={styles.settingForm} noValidate>
          <button
            className={styles.locationButton}
            type="button"
            onClick={getUserLocation}
          >
            <FontAwesomeIcon icon={faLocationCrosshairs} color="#007BFF" />
            Use Location
          </button>
          <div>
            <label htmlFor="lat">Latitude:&nbsp;</label>
            <input
              type="number"
              step="0.01"
              id="lat"
              name="lat"
              min={-90}
              max={90}
              data-valid={inputValidation.lat}
              formNoValidate
              value={inputState.latitude}
              onChange={(e) => {
                setInputState({
                  ...inputState,
                  latitude: parseFloat(e.target.value),
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="long">Longitude:&nbsp;</label>
            <input
              type="number"
              step="0.01"
              id="long"
              name="long"
              min={-180}
              max={180}
              data-valid={inputValidation.long}
              value={inputState.longitude}
              onChange={(e) => {
                setInputState({
                  ...inputState,
                  longitude: parseFloat(e.target.value),
                });
              }}
            />
          </div>
        </form>
        <form className={styles.settingForm}>
          <div>
            <label htmlFor="targetdate">Target Date:&nbsp;</label>
            <input
              type="date"
              id="targetdate"
              name="targetdate"
              min={inputState.startDate}
              max={inputState.endDate}
              data-valid={inputValidation.target}
              value={inputState.targetDate}
              onChange={(e) => {
                setInputState({ ...inputState, targetDate: e.target.value });
              }}
            />
          </div>
          <div className={styles.intervalInput}>
            <label htmlFor="startdate">Interval:&nbsp;</label>
            <div>
              <input
                type="date"
                id="startdate"
                name="startdate"
                min="1940-01-01"
                max={inputState.endDate}
                data-valid={inputValidation.start}
                value={inputState.startDate}
                onChange={(e) => {
                  setInputState({ ...inputState, startDate: e.target.value });
                }}
              />
              <label htmlFor="enddate">&nbsp;&mdash;&nbsp;</label>
              <input
                type="date"
                id="enddate"
                name="enddate"
                min={inputState.startDate}
                max={new Date().toISOString().slice(0, -14)}
                data-valid={inputValidation.end}
                value={inputState.endDate}
                onChange={(e) => {
                  setInputState({ ...inputState, endDate: e.target.value });
                }}
              />
            </div>
          </div>
        </form>
      </div>
      <CollapsibleMap
        inputState={inputState}
        setInputState={setInputState}
        center={center}
        setCenter={setCenter}
      />
    </div>
  );
}
