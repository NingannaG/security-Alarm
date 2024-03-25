import { FaCheck, FaTimes } from "react-icons/fa";
import {
  GREEN_MARKER_ICON_URL,
  ORANGE_MARKER_ICON_URL,
  PINK_MARKER_ICON_URL,
  RED_MARKER_ICON_URL,
} from "../constants/constant";

export const getMarkerIcon = (anomaly, type) =>
  anomaly !== "true" ? GREEN_MARKER_ICON_URL : getIconBasedOnType(type);

const getIconBasedOnType = (type) => {
  switch (type) {
    case 1:
      return PINK_MARKER_ICON_URL;
    case 2:
      return ORANGE_MARKER_ICON_URL;
    default:
      return RED_MARKER_ICON_URL;
  }
};

export const getIcon = (anomaly) => {
  return anomaly === "true" ? (
    <FaCheck color="green" />
  ) : (
    <FaTimes color="red" />
  );
};
