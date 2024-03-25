import React from "react";
import LineChart from "./LineChart";

const ChartContainer = ({ data }) => {

  return (
    <div style={{ display: "flex" }}>
      <LineChart
        data={data}
        id="temperature"
        xAxisLabel="Time"
        yAxisLabel="Temperature"
        datasetLabel="Temperature"
        lineColor="rgb(255, 99, 132)"
        getDataProperty={(item) => item.temperature}
      />
      <LineChart
        id="fuelStatus"
        data={data}
        xAxisLabel="Time"
        yAxisLabel="Fuel Status"
        datasetLabel="Fuel Status"
        lineColor="rgb(25, 192, 192)"
        getDataProperty={(item) => item.fuelStatus}
      />
    </div>
  );
};

export default ChartContainer;
