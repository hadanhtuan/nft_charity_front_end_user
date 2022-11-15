import { Box, Typography, Button } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import img2 from "../assets/img/img2.png";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAuctionById } from "../actions/auction";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function Auction() {
  const { nft_id } = useParams();

  const { currCampaign } = useSelector((state) => state.campaign);
  const colors = [currCampaign?.img1_url, currCampaign?.img2_url];
  const delay = 3000;
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuctionById(nft_id));
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [nft_id, index]);

  if (!currCampaign) return null;

  return (
    <Box sx={{ padding: "16px 50px", height: "100%" }}>
      <Box
        className="slideshow"
        sx={{
          display: "flex",
          flexDirection: "column",
          zIndex: 1,
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <Box
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {colors.map((img, index) => (
            <img className="slide" key={index} src={img} />
          ))}
        </Box>

        <Box className="slideshowDots">
          {colors.map((_, idx) => (
            <Box
              key={idx}
              className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            ></Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          zIndex: 2,
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <img
          src={img2}
          style={{
            maxWidth: "21%",
            height: "auto",
            marginLeft: "10%",
            flex: 1,
          }}
          alt=""
        />

        <Box
          sx={{
            display: "flex",
            marginTop: "10%",
            // marginLeft: "300px",
            flex: 2,
            padding: "0px 30px",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3" gutterBottom>
            {currCampaign.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Remaining Time ( End at)
          </Typography>
          <Box
            sx={{
              padding: "8px 16px",
              bgcolor: "#fff",
              maxWidth: "300px",
              border: "1px solid #ccc",
              borderRadius: "30px",
              marginBottom: "8px",
            }}
          >
            <Typography variant="h5">Current Value</Typography>
          </Box>
          <Typography variant="subtitle1" gutterBottom>
            Description
          </Typography>
          <Typography align="justify" paragraph>
            {currCampaign.desc}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
          <Button
            style={{
              borderRadius: 35,
              backgroundColor: "#21b6ae",
              padding: "18px 36px",
              fontSize: "18px",
            }}
            variant="contained"
            size="large"
          >
            Make Offer
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
