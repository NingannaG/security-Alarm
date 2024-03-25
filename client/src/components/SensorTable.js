import React from "react";
import styles from "../styles/SensorTable.module.css";
import SensorTableRow from "./SensorTableRow";

const SensorTable = ({ columns, data }) => {
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
      <tbody>{data.map((row, idx) => SensorTableRow(row, idx, columns))}</tbody>
    </table>
  );
};

export default SensorTable;
