import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardMedia,
  Button,
} from "@mui/material";

import "../styles/components/ItemCampaign.scss";

function ItemCampaign() {
  return (
    <Box className="item_campaign">
      <Avatar className="avatar" />
      <Box className="item_campaign_title">
        <Typography variant="subtitle1" sx={{ fontWeight: "700" }}>
          Title
        </Typography>
        <Typography variant="body2">Remaining time</Typography>
      </Box>
    </Box>
  );
}

export default ItemCampaign;
