import {
  faChevronDown,
  faChevronUp,
  faLocationDot,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable, Map, Point } from "pigeon-maps";
import { inputState, myColors } from "../shared/utils";
import { useRef, useState } from "react";
import styles from "../styles/form.module.css";

export default function CollapsibleMap({
  inputState,
  setInputState,
  center,
  setCenter,
}) {
  const [zoom, setZoom] = useState(11);
  const [mapOpen, setMapOpen] = useState(false);

  const mapRef = useRef(null);

  return (
    <div
      className={styles.mapGroup}
      onClick={() => {
        setMapOpen(!mapOpen);
      }}
    >
      <button
        className={styles.mapToggleButton}
        style={
          mapOpen
            ? { borderBottomLeftRadius: "0px" }
            : { borderBottomLeftRadius: "10px" }
        }
        type="button"
        onClick={() => setMapOpen(!mapOpen)}
      >
        {mapOpen ? (
          <p>
            <FontAwesomeIcon icon={faChevronUp} color={myColors.IconBlue} />
            Collapse Map
          </p>
        ) : (
          <div>
            <FontAwesomeIcon icon={faChevronDown} color={myColors.IconBlue} />
            Expand Map
            <FontAwesomeIcon
              icon={faMapLocationDot}
              color={myColors.IconBlue}
            />
          </div>
        )}
      </button>
      <div
        ref={mapRef}
        className={styles.mapSpace}
        style={mapOpen ? { height: "300px" } : { height: "40px" }}
      >
        <Map
          height={300}
          defaultCenter={[50.8, 6.1]}
          defaultZoom={11}
          center={center}
          zoom={zoom}
          mouseEvents={mapOpen}
          touchEvents={mapOpen}
          onClick={({ latLng }) => updateMarker(latLng)}
          onBoundsChanged={({ center, zoom }) => {
            setCenter(center);
            setZoom(zoom);
          }}
        >
          <Draggable
            offset={[6, 20]}
            anchor={[Number(inputState.latitude), Number(inputState.longitude)]}
            onDragEnd={updateMarker}
          >
            {!Number.isNaN(inputState.latitude) &&
            !Number.isNaN(inputState.longitude) &&
            inputState.latitude !== undefined &&
            inputState.longitude !== undefined ? (
              <FontAwesomeIcon icon={faLocationDot} color={myColors.IconBlue} />
            ) : null}
          </Draggable>
        </Map>
      </div>
    </div>
  );

  function updateMarker(anchor) {
    setInputState({ ...inputState, latitude: anchor[0], longitude: anchor[1] });
  }
}
