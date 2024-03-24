import React from "react";

const InfoTable = () => {
  return (
    <div className="info-table">
      <table
        style={{
          borderCollapse: "collapse",
          width: "50%",
          height: "25%",
          marginLeft: "25%",
          border: "1px solid",
        }}
      >
        <thead></thead>
        <tbody>
          <tr>
            <td style={cellStyle}>-</td>
            <td style={cellStyle}>No Anomaly</td>
          </tr>
          <tr style={rowStyleType1}>
            <td style={cellStyle}>1</td>
            <td style={cellStyle}>Temp &gt; 45°C</td>
          </tr>
          <tr style={rowStyleType2}>
            <td style={cellStyle}>2</td>
            <td style={cellStyle}>Fuel &lt; 20 L</td>
          </tr>
          <tr style={rowStyleType3}>
            <td style={cellStyle}>3</td>
            <td style={cellStyle}>PowerSource running &gt; 2 hrs</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const cellStyle = {
  padding: "8px",
  borderBottom: "1px solid #ddd",
};

const rowStyleType1 = {
  backgroundColor: "#ffcccc",
};

const rowStyleType2 = {
  backgroundColor: "#ff6666",
};

const rowStyleType3 = {
  backgroundColor: "#ff0000",
};

export default InfoTable;
