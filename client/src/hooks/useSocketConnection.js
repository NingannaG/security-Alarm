import { useEffect, useState } from "react";
import { handleEventData } from "../utils/helper";
import { socket } from "../service/socket";

const useSocketConnection = (setData) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on("iot-data-updated", (data) => handleEventData(data, setData));

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
};

export default useSocketConnection;
