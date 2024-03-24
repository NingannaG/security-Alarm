import React from "react";
import SensorTable from "./SensorTable";
import { COLUMNS_INFO } from "../constants/constant";
import InfoTable from "./InfoTable";

const Container = ({ data }) => {
  return (
    <div className="container">
      <SensorTable columns={COLUMNS_INFO} data={data} />
      <InfoTable></InfoTable>
    </div>
  );
};

export default Container;
