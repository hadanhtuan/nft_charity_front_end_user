import React from "react";
import Carousel from "react-material-ui-carousel";
import { CardMedia } from "@mui/material";
import landscape2 from "../assets/img/landscape2.jpg";
import landscape1 from "../assets/img/landscape1.jpg";
import img1 from "../assets/img/img1.png";
import { Box } from "@mui/system";

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

  return (
    <Carousel
      autoPlay
      interval={2000}
      animation="slide"
      duration={1000}
      swipe={true}
      indicators
      cycleNavigation={true}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );

  function Item(props) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "300px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          image={props.item.img}
          sx={{ height: "100%", width: "100%" }}
        />
      </Box>
    );
  }
}
