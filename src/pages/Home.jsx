import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardMedia,
  Button,
} from "@mui/material";
import Slider from "../components/Slider";
import img2 from "../assets/img/img2.png";

const ItemCampaignDemo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "white",
        border: "1px solid #E5E5E5",
        borderRadius: "10px",
        padding: "12px",
        gap: "12px",
      }}
    >
      <Avatar></Avatar>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "700" }}>
          Title
        </Typography>
        <Typography variant="body1">Remaining time</Typography>
      </Box>
    </Box>
  );
};

const NFTItem = () => {
  return (
    <Card sx={{ width: "100%" }}>
      <Box
        sx={{
          flex: 1,
          height: "190px",
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
      <Box sx={{ display: "flex", padding: "16px" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "700" }}>
            Title
          </Typography>
          <Typography variant="body1">Remaining time...</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "700" }}>
            Price
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

const NFTList = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography variant="h4">NFT</Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: "700" }}>
          See more...
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: "14px" }}>
        <NFTItem />
        <NFTItem />
        <NFTItem />
      </Box>
    </Box>
  );
};

export const Home = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 2, flexDirection: "column" }}>
          <Slider />
          <NFTList />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "0px 24px",
          }}
        >
          {/* information of campaign list demo */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingBottom: "34px",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography variant="h4">New Campaign</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: "700" }}>
                See more...
              </Typography>
            </Box>
            <ItemCampaignDemo></ItemCampaignDemo>
            <ItemCampaignDemo></ItemCampaignDemo>
            <ItemCampaignDemo></ItemCampaignDemo>
          </Box>

          {/* the wallet */}
          <Card
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{ height: "80px", width: "80%", alignSelf: "center" }}
            >
              <Typography>Connect to wallet</Typography>
            </Button>
          </Card>
        </Box>
      </Box>
    </>
  );
};
