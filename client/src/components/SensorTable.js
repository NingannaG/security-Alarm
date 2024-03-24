import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import styles from "../styles/SensorTable.module.css";

const SensorTable = ({ columns, data }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case "1":
        return "#ffcccc";
      case "2":
        return "#ff6666";
      default:
        return "#ff0000";
    }
  };
  const getIcon = (anomaly) => {
    return anomaly === "true" ? (
      <FaCheck color="green" />
    ) : (
      <FaTimes color="red" />
    );
  };
  return (
    <table className={styles.tableContainer}>
      <thead className={styles.headerRow}>
        <tr>
          {columns.map((column) => (
            <th key={column.Header} className={styles.cell}>
              {column.Header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr
            key={`${row.id}-${idx}`}
            className={`${styles.cell} ${
              row.anomaly === "true" ? styles.anomalyTrue : ""
            }`}
            style={{
              backgroundColor:
                row.anomaly === "true" ? getTypeColor(row.type) : "inherit",
            }}
          >
            {columns.map((column) => (
              <td key={`${row.id}-${column.Header}`} className={styles.cell}>
                {column.accessor === "anomaly"
                  ? getIcon(row.anomaly)
                  : column.accessor === "type" && row.type === "-"
                  ? "-"
                  : row[column.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SensorTable;
