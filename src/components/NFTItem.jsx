import React from "react";
import { Box, Typography, Card, CardMedia } from "@mui/material";
import img2 from "../assets/img/img2.png";
import DateCountdown from "react-date-countdown-timer";

function NFTItem({ title, price, remainingTime }) {
  let endAt = new Date(remainingTime * 1000);
  let price_eth = price / 1000000000000000000;
  return (
    <Card sx={{ width: "280px" }}>
      <Box
        sx={{
          flex: 1,
          height: "360px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          image={img2}
          sx={{ height: "100%", width: "100%" }}
        />
      </Box>
      <Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              padding: "8px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "700" }}>
              {title ? title : "No title"}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: "700" }}>
              Price: {price ? price_eth + " ETH" : "No price"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", padding: "8px" }}>
            <Typography variant="body1">
              Remaining time:
              {remainingTime ? (
                <DateCountdown
                  dateTo={endAt}
                  callback={() => console.log("finished")}
                />
              ) : (
                "No time"
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default NFTItem;
