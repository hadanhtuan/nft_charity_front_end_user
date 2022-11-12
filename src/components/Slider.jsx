import React from "react";

import { Paper, Button, Avatar, Card, CardMedia } from "@mui/material";
import landscape2 from "../assets/img/landscape2.jpg";
import landscape1 from "../assets/img/landscape1.jpg";
import img1 from "../assets/img/img1.png";
import { Box } from "@mui/system";
import "../styles/components/Slider.scss";

export default function Slider(props) {
  var items = [
    {
      name: "anh cover #1",
      img: landscape1,
    },
    {
      name: "anh cover #2",
      img: landscape2,
    },
    {
      name: "anh cover #3",
      img: img1,
    },
  ];

  function Item(props) {
    return (
      <Card className="item">
        {/* <img className="item__img" src={props.item.img} /> */}
        <Box className="item__container">alo</Box>
      </Card>
    );
  }

  return <></>;
}
