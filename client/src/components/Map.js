import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React, { useCallback, useEffect, useState } from "react";
import {
  GREEN_MARKER_ICON_URL,
  RED_MARKER_ICON_URL,
} from "../constants/constant";

const containerStyle = {
  width: "99vw",
  height: "54vh",
};

const Map = ({ data }) => {
  const [markersLocation, setMarkersLocation] = useState([]);
  const [map, setMap] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAP_API,
  });

  const onLoad = useCallback((map) => {
    map.setZoom(5);
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  const center = {
    lat: 22, // default latitude
    lng: 78, // default longitude
  };

  useEffect(() => {
    const markerData = data.map((d) => {
      return {
        tower: d.tower,
        position: {
          lat: d.location.latitude,
          lng: d.location.longitude,
        },
        anomaly: d.anomaly,
        type: d.type,
      };
    });
    setMarkersLocation(markerData);
  }, [data]);

  const getMarkerIcon = (anomaly) =>
    anomaly !== "true" ? GREEN_MARKER_ICON_URL : RED_MARKER_ICON_URL;

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ streetViewControl: false, mapTypeControl: false }}
    >
      {markersLocation.map((mark) => (
        <Marker
          key={mark.tower}
          position={mark.position}
          icon={{
            url: getMarkerIcon(mark.anomaly),
          }}
          title={mark.type}
        ></Marker>
      ))}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
