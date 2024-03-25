import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setHoveredMarker } from "../redux/hoverSlice";
import {
  mapDefaultCenter,
  mapContainerStyle,
  infoTableMapping,
  mapInitialZoom,
  GMapsKey,
} from "../utils/constant";
import styles from "../styles/InfoTable.module.css";
import { getMarkerIcon } from "../utils/utilityFunction";
import InfoTable from "./InfoTable";
import { useNavigate } from "react-router";

const Map = ({ data }) => {
  const [markersLocation, setMarkersLocation] = useState([]);
  const [, setMap] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mapRef = useRef();
  const [mapCenter, setMapcenter] = useState(mapDefaultCenter);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GMapsKey,
  });
  const handleMarkerClick = (towerNumber) => {
    navigate(`/dashboard/${towerNumber}`);
  };
  const onLoad = useCallback((map) => {
    map.setZoom(mapInitialZoom);
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  useEffect(() => {
    const markerData = data.map(({ tower, location, type, anomaly }) => {
      return {
        tower,
        anomaly,
        type,
        position: {
          lat: location.latitude,
          lng: location.longitude,
        },
      };
    });
    setMarkersLocation(markerData);
  }, [data]);

  const handleDragEnd = () => {
    if (mapRef.current && mapRef.current.state && mapRef.current.state.map) {
      setMapcenter(
        mapRef.current.state.map
          ? {
              lat: mapRef.current.state.map.center.lat(),
              lng: mapRef.current.state.map.center.lng(),
            }
          : mapDefaultCenter
      );
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={mapCenter}
      zoom={mapInitialZoom}
      ref={mapRef}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onDragEnd={handleDragEnd}
      options={{ streetViewControl: false, mapTypeControl: false }}
    >
      {markersLocation.map(({ tower, position, type, anomaly }) => (
        <Marker
          key={tower}
          position={position}
          icon={{
            url: getMarkerIcon(anomaly, type),
          }}
          onClick={() => handleMarkerClick(tower)}
          onMouseOut={() => dispatch(setHoveredMarker(-1))}
          onMouseOver={() => dispatch(setHoveredMarker(tower))}
          title={`Tower: ${tower} \nAnomaly: ${
            infoTableMapping(Number.parseInt(type)).text
          }`}
        />
      ))}
      <></>
      <InfoTable tableStyle={styles.infoTableContainer} />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
