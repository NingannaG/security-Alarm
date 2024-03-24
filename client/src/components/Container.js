import React from "react";
import SensorTable from "./SensorTable";
import { COLUMNS_INFO } from "../constants/constant";
import InfoTable from "./InfoTable";

const Container = ({ data }) => {
  return (
    <div className="container">
      {data && data.length > 0 ? (
        <SensorTable columns={COLUMNS_INFO} data={data} />
      ) : (
        <p style={{width: "75%"}}>No sensor data available.</p>
      )}
      <InfoTable />
    </div>
  );
};

export default Container;
