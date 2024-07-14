/// <reference types="googlemaps" />
import { GoogleMap, Polygon, useLoadScript } from "@react-google-maps/api";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Message, Segment } from "semantic-ui-react";
import convert from "./conversion";
import styles from "./RegionSelector.module.css";

const options: google.maps.MapOptions = {
  rotateControl: false,
  scaleControl: false,
  streetViewControl: false,
  panControl: false,
  fullscreenControl: false,
};

interface RegionSelectorProps {
  value: string;
  onChange?: (event: string) => void;
  readonly?: boolean;
}

export default function RegionSelector(props: RegionSelectorProps) {
  const [polygonRef, setPolygonRef] = useState<google.maps.Polygon>();
  const polygonPath = useMemo(
    () => convert.polygonStringToCoords(props.value),
    [props.value],
  );
  const mapRef = React.useRef<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY!,
  });

  const onPolygonChange = useCallback(() => {
    props.onChange?.(convert.polygonToString(polygonRef!));
  }, [polygonRef, props]);

  const onLoad = useCallback(
    (map) => {
      polygonPath && map.fitBounds(toLatLngBounds(polygonPath));
      mapRef.current = map;
    },
    [polygonPath],
  );

  useEffect(() => {
    if (!polygonPath || !mapRef.current) {
      return;
    }

    mapRef.current.fitBounds(toLatLngBounds(polygonPath));
  }, [polygonPath]);

  const onPolygonRemove = useCallback(
    (event: google.maps.PolyMouseEvent) => {
      if (event.vertex === undefined) {
        return;
      }

      polygonRef!.getPath().removeAt(event.vertex);
      onPolygonChange();
    },
    [polygonRef, onPolygonChange],
  );

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
      options={{
        ...options,
        disableDefaultUI: props.readonly,
        gestureHandling: props.readonly ? "none" : undefined,
        clickableIcons: !props.readonly,
      }}
      mapContainerClassName={styles.map}
      onLoad={onLoad}
    >
      <Polygon
        options={{
          draggable: !props.readonly,
          editable: !props.readonly,
          clickable: !props.readonly,
        }}
        path={polygonPath}
        onLoad={setPolygonRef}
        onDragEnd={onPolygonChange}
        onMouseUp={onPolygonChange}
        onRightClick={onPolygonRemove}
      />
    </GoogleMap>
  );
}

function toLatLngBounds(
  points: { lng: number; lat: number }[],
): google.maps.LatLngBounds {
  const bounds = new google.maps.LatLngBounds();
  points.forEach((point) => bounds.extend(point));
  return bounds;
}
