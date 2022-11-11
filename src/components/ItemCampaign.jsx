import React from "react";
import {
    Box,
    Typography,
    Avatar,
    Card,
    CardMedia,
    Button,
  } from "@mui/material";

function ItemCampaign() {
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
}

export default ItemCampaign;