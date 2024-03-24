import React, { useEffect, useState } from "react";
import Table from "./Table";
import { socket } from "../service/socket";
import Map from "./Map";
import { COLUMNS_INFO } from "../constants/constant";

const Body = () => {
  const [data, setData] = useState([]);
  const handleEventData = async (data) => {
    setData([...data]);
  };

  useEffect(() => {
    socket.on("iot-data-updated", handleEventData);
    socket.emit("join_towerdata");
    return () => {
      socket.off("iot-data-updated", handleEventData);
    };
  }, []);

  return (
    <div>
      {/* <Map></Map> */}
      <Table columns={COLUMNS_INFO} data={data} />
    </div>
  );
};

export default Body;
