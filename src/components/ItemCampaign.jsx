import React from "react";
import { Box, Typography, Avatar, Card } from "@mui/material";

function ItemCampaign() {
  return (
    <Card className="itemCampaign">
      <Box className="itemCampaign__container">
        <Avatar className="itemCampaign__avatar" />
        <Box className="itemCampaign__body">
          <Typography variant="subtitle1" fontWeight={700}>
            Title
          </Typography>
          <Typography variant="body1">Remaining time</Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default ItemCampaign;
