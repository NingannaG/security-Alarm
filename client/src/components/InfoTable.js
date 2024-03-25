import React from "react";
import styles from "../styles/InfoTable.module.css";
import { infoTableMapping, infoTableValue } from "../utils/constant";

const InfoTable = () => {
  return (
    <div className={styles.infoTableContainer}>
      <table className={styles.infoTable}>
        <tbody>
          {infoTableValue.map((value) => {
            let mapping = infoTableMapping(value);
            let infoRowStyle = styles[mapping.style];
            let boldFontFamily = { fontFamily: "fantasy" };
            return (
              <>
                <tr>
                  <td className={infoRowStyle} style={boldFontFamily}>
                    {value}
                  </td>
                  <td className={infoRowStyle}>{mapping.text}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InfoTable;
