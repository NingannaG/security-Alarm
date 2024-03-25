export const infoTableMapping = (type) => {
  switch (type) {
    case 1:
      return {
        style: "rowStyleType1",
        text: "Temp > 45°C",
      };
    case 2:
      return {
        style: "rowStyleType2",
        text: "Fuel < 20 L",
      };
    case 3:
      return {
        style: "rowStyleType3",
        text: "PowerSource running > 2 hrs",
      };
    default:
      return {
        style: "cellStyle",
        text: "No Anomaly",
      };
  }
};

export const infoTableValue = ["-", 1, 2, 3];

export const mapContainerStyle = {
  height: "100vh",
  width: "60vw",
};

export const mapDefaultCenter = {
  lat: 22, // default latitude
  lng: 78, // default longitude
};

export const mapInitialZoom = 4.25;

export const GMapsKey = process.env.GOOGLE_MAP_API;
