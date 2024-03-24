import React, { useEffect, useState } from "react";
import { socket } from "../service/socket";
import Map from "./Map";
import Container from "./Container";

const Body = () => {
  const [data, setData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const handleEventData = async (data) => {
    setData([...data]);
  };

  useEffect(() => {
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
