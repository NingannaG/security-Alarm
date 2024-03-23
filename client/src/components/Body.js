import React from "react";
import Table from "./Table";
import Map from "./Map";

const Body = () => {
  const columns = [
    { Header: "Tower", accessor: "tower" },
    { Header: "Temperature (deg C)", accessor: "temperature" },
    { Header: "Power Source", accessor: "powerSource" },
    { Header: "Fuel Status(L)", accessor: "fuelStatus" },
    { Header: "Anomaly", accessor: "anomaly" },
    { Header: "Anomaly Type", accessor: "anomalyType" },
  ];

  const tableData = [
    {
      tower: 1,
      temperature: 25,
      powerSource: "Electric",
      fuelStatus: 37,
      anomaly: "false",
      anomalyType: "NA",
    },
  ];
  return (
    <div>
      {/* <Map></Map> */}
      <Table columns={columns} data={tableData} />
    </div>
  );
};

export default Body;
