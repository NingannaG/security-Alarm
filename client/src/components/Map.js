import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React, { useMemo } from "react";

const mapContainerStyle = {
  width: "98vw",
  height: "50vh",
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAP_API,
  });
  const center = useMemo(
    () => ({
      lat: 19.076, // default latitude
      lng: 72.8777, // default longitude
    }),
    []
  );

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }
  return (
    <div>
      {" "}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <Marker
          position={{
            lat: 19.076, // default latitude
            lng: 72.8777, // default longitude
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default Map;
