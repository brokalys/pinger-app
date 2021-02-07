/// <reference types="googlemaps" />
import { GoogleMap, Polygon, useLoadScript } from "@react-google-maps/api";
import React, { useMemo, useState } from "react";
import { Message, Segment } from "semantic-ui-react";
import convert from "./conversion";
import styles from "./RegionSelector.module.css";

const options = {
  rotateControl: false,
  scaleControl: false,
  streetViewControl: false,
  panControl: false,
  fullscreenControl: false,
};

interface RegionSelectorProps {
  value: string;
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  onChange: (event: string) => void;
}

export default function RegionSelector(props: RegionSelectorProps) {
  const [polygonRef, setPolygonRef] = useState<google.maps.Polygon>();
  const polygonPath = useMemo(
    () => convert.polygonStringToCoords(props.value),
    [props.value],
  );

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY!,
  });

  function onPolygonChange() {
    props.onChange(convert.polygonToString(polygonRef!));
  }

  function onPolygonRemove(event: google.maps.PolyMouseEvent) {
    if (event.vertex === undefined) {
      return;
    }

    polygonRef!.getPath().removeAt(event.vertex);
    onPolygonChange();
  }

  if (!isLoaded) {
    return <Segment loading className={styles.map} />;
  }

  if (loadError) {
    return (
      <Message negative>
        <Message.Header>Problēma ielādējot karti</Message.Header>
        <p>
          Diemžēl, radusies problēma ielādējot karti. Pašlaik var izmantot tikai
          ātro reģionu izvēlni (augstāk).
        </p>
      </Message>
    );
  }

  return (
    <GoogleMap
      options={options}
      mapContainerClassName={styles.map}
      center={props.center}
      zoom={props.zoom}
    >
      <Polygon
        draggable
        editable
        path={polygonPath}
        onLoad={setPolygonRef}
        onDragEnd={onPolygonChange}
        onMouseUp={onPolygonChange}
        onRightClick={onPolygonRemove}
      />
    </GoogleMap>
  );
}
