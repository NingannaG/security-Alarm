import { formatTime } from "../utils/helper";

const AnomalyTable = ({ data }) => {
  return (
    <div className="sensor-data-table">
      <table
        style={{
          width: "70%",
          textAlign: "center",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Temperature</th>
            <th style={tableHeaderStyle}>Fuel Status</th>
            <th style={tableHeaderStyle}>Time</th>
            <th style={tableHeaderStyle}>Type</th>
            <th style={tableHeaderStyle}>Power Source</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              style={index % 2 === 0 ? evenRowStyle : oddRowStyle}
            >
              <td style={cell}>{item.temperature}</td>
              <td>{item.fuelStatus}</td>
              <td>{formatTime(item.time)}</td>
              <td>{item.type}</td>
              <td>{item.powerSource}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Define styles
const tableHeaderStyle = {
  backgroundColor: "#f0f0f0",
  color: "#333",
  fontWeight: "bold",
  padding: "8px",
  borderBottom: "1px solid #ddd",
};

const evenRowStyle = {
  backgroundColor: "#fff",
};

const oddRowStyle = {
  backgroundColor: "#f9f9f9",
};
const cell={
    padding: "12px"
}

export default AnomalyTable;
