import React from "react";
import Map from "./Map";
import Container from "./Container";
import Title from "./Title";

const Body = ({ data }) => {
  return (
    <div style={{ display: "flex" }}>
      <Title />
      <Container data={data}></Container>
      <Map data={data}></Map>
    </div>
  );
};

export default Body;
