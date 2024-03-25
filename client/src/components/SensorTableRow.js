import { useDispatch, useSelector } from "react-redux";
import { getIcon } from "../utils/utilityFunction";
import infoStyles from "../styles/InfoTable.module.css";
import styles from "../styles/SensorTable.module.css";
import { infoTableMapping } from "../utils/constant";
import { useNavigate } from "react-router";
import { setHoveredMarker } from "../redux/hoverSlice";

export const SensorTableRow = (row, idx, columns) => {
  const dispatch = useDispatch()
  const hoveredMarker = useSelector((store) => store.hover.hoveredMarker);
  const navigate = useNavigate();
  const handleRowClick = (towerNumber) => {
    navigate(`/dashboard/${towerNumber}`);
  };

  return (
    <tr
      key={`${row.tower}-${idx}`}
      onClick={() => handleRowClick(row.tower)}  
      onMouseOut={() => dispatch(setHoveredMarker(-1))}
      onMouseOver={() => dispatch(setHoveredMarker(row.tower))}
      className={` ${
        infoStyles[infoTableMapping(Number.parseInt(row.type)).style]
      } ${row.anomaly === "true" ? styles.anomalyTrue : ""}`}
      style={{
        scale: hoveredMarker === idx + 1 ? "1.01" : "1",
        fontFamily: hoveredMarker === idx + 1 ? "fantasy" : "monospace",
        cursor: "pointer",
      }}
    >
      {columns.map((column) => {
        return (
          <td key={`${row.id}-${column.Header}`} className={styles.cell}>
            {column.accessor === "anomaly"
              ? getIcon(row.anomaly)
              : column.accessor === "type" && row.type === "-"
              ? "-"
              : row[column.accessor]}
          </td>
        );
      })}
    </tr>
  );
};

export default SensorTableRow;
