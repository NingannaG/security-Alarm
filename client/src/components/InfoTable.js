import React from "react";
import styles from "../styles/InfoTable.module.css";
import { infoTableMapping, infoTableValue } from "../utils/constant";

const InfoTable = ({tableStyle}) => {
  return (
    <div className={tableStyle}>
      <table className={styles.infoTable}>
        <tbody>
          {infoTableValue.map((value,idx) => {
            let mapping = infoTableMapping(value);
            let infoRowStyle = styles[mapping.style];
            let boldFontFamily = { fontFamily: "fantasy" };
            return (
              // <>
                <tr key={idx}>
                  <td className={infoRowStyle} style={boldFontFamily}>
                    {value}
                  </td>
                  <td className={infoRowStyle}>{mapping.text}</td>
                </tr>
              // </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InfoTable;
