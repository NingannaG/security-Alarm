import React, { useEffect, useState } from "react";
import Table from "./Table";
import Map from "./Map";

const Body = () => {
  const [data, setData] = useState([]);
  const columns = [
    { Header: "Tower", accessor: "tower" },
    { Header: "Temperature (deg C)", accessor: "temperature" },
    { Header: "Power Source", accessor: "powerSource" },
    { Header: "Fuel Status(L)", accessor: "fuelStatus" },
    { Header: "Anomaly", accessor: "anomaly" },
    { Header: "Anomaly Type", accessor: "type" },
  ];

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data");
      const jsonData = await response.json();
      setData([...jsonData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const timer = setInterval(() => {
      fetchData();
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div>
      {/* <Map></Map> */}
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Body;
