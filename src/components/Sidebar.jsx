import * as React from "react";
import { Box, CssBaseline } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CampaignIcon from "@mui/icons-material/Campaign";
import CreateIcon from "@mui/icons-material/Create";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
const drawerWidth = 200;

export default function MySidebar() {
  return (
    <Box>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
        elevation={1}
      >
        {/* this is a full box to contain any thing in sidebar */}

        {/* start phan header */}
        <Box sx={{ display: `flex`, height: `100px`, margin: `0 auto` }}>
          <Box
            sx={{
              display: `flex`,
              justifyContent: `center`,
              alignItems: `center`,
            }}
          >
            <Box>
              <Typography ml={1}>NFT CHARITY</Typography>
            </Box>
          </Box>
        </Box>
        {/* end phan header */}
        <Divider />
        {/* start phan option */}
        <List>
          {
            <React.Fragment>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <FormatListBulletedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Your NFT" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ReceiptLongIcon />
                  </ListItemIcon>
                  <ListItemText primary="History" />
                </ListItemButton>
              </ListItem>
            </React.Fragment>
          }
        </List>
        {/* end phan option */}
        <Divider />

        {/* start phan footer */}
      </Drawer>
    </Box>
  );
}
