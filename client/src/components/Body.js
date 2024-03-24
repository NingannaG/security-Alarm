import React, { useState } from "react";
import Map from "./Map";
import Container from "./Container";
import useSocketConnection from "../hooks/useSocketConnection";

const Body = () => {
  const [data, setData] = useState([]);

  useSocketConnection(setData);

  return (
    <>
      <Map data={data}></Map>
      <Container data={data}></Container>
    </>
  );
};

export default Body;
