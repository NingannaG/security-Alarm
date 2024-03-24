import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React, { useCallback, useEffect, useState } from "react";

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
  const onLoad = useCallback(function callback(map) {
    map.setZoom(5)

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
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

  const getMarkerIcon = (anomaly) => {
    if (anomaly !== "true") {
      return "https://maps.google.com/mapfiles/ms/icons/green-dot.png"; // Green marker icon URL
    } else {
      return "https://maps.google.com/mapfiles/ms/icons/red-dot.png"; // Red marker icon URL
    }
  };

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
