import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";

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
    <table
      style={{
        borderCollapse: "collapse",
        width: "75%",
        border: "1px solid",
      }}
    >
      <thead style={{ backgroundColor: "#f2f2f2" }}>
        <tr>
          {columns.map((column) => (
            <th
              key={column.Header}
              style={{
                padding: "8px",
                borderBottom: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              {column.Header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr
            key={row.id}
            style={{
              
              borderBottom: "1px solid #ddd",
              padding: "8px",
              textAlign: "left",
              color: row.anomaly === "true" ? "white" : "inherit",
              backgroundColor:
                row.anomaly === "true" ? getTypeColor(row.type) : "inherit",
            }}
          >
            {columns.map((column) => (
              <td
                key={`${row.id}-${column.Header}`}
                style={{
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {column.accessor === "anomaly"
                  ? getIcon(row.anomaly)
                  : column.accessor === "type" && row.type === "NULL"
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
