import React from "react";
import styles from "../styles/InfoTable.module.css";

const InfoTable = () => {
  return (
    <div className={styles.infoTableContainer}>
      <table className={styles.infoTable}>
        <thead></thead>
        <tbody>
          <tr>
            <td className={styles.cellStyle}>-</td>
            <td className={styles.cellStyle}>No Anomaly</td>
          </tr>
          <tr className={styles.rowStyleType1}>
            <td className={styles.cellStyle}>1</td>
            <td className={styles.cellStyle}>Temp &gt; 45°C</td>
          </tr>
          <tr className={styles.rowStyleType2}>
            <td className={styles.cellStyle}>2</td>
            <td className={styles.cellStyle}>Fuel &lt; 20 L</td>
          </tr>
          <tr className={styles.rowStyleType3}>
            <td className={styles.cellStyle}>3</td>
            <td className={styles.cellStyle}>PowerSource running &gt; 2 hrs</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InfoTable;
