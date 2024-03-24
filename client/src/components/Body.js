import React, { useEffect, useState } from "react";
import { socket } from "../service/socket";
import Map from "./Map";
import Container from "./Container";
import { getLastUpdatedTime } from "../utils/helper";

const Body = () => {
  const [data, setData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleEventData = async (data) => {
      const updatedData = data.map((d) => {
        return { ...d, time: getLastUpdatedTime(d.time) };
      });
      setData([...updatedData]);
    };

    socket.on("iot-data-updated", handleEventData);

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    if (isConnected) socket.emit("join_towerdata");

    return () => {
      socket.off("iot-data-updated", handleEventData);
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [isConnected]);

  return (
    <>
      <Map data={data}></Map>
      <Container data={data}></Container>
    </>
  );
};

export default Body;
