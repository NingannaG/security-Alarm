import React, { useState } from "react";
import Map from "./Map";
import Container from "./Container";
import useSocketConnection from "../hooks/useSocketConnection";
import Title from "./Title";

const Body = () => {
  const [data, setData] = useState([]);
  useSocketConnection(setData);

  return (
    <div style={{ display: "flex" }}>
      <Title />
      <Container data={data}></Container>
      <Map data={data}></Map>
    </div>
  );
};

export default Body;
