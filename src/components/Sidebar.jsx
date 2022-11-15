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

import HomeIcon from "@mui/icons-material/Home";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// import logo from "../../assets/litecoin.svg";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SettingsIcon from "@mui/icons-material/Settings";
// import bottomSideBar from "../../assets/bottomSidebarImage.svg";
import { useHistory, useLocation } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const drawerWidth = 200;

export default function MySidebar() {
  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname.split("/")[2];
  console.log(pathname);

  const backLink = {
    backgroundColor: "rgb(0, 221, 162)",
    color: "white",
    "&:hover": {
      backgroundColor: "rgb(7, 177, 77, 0.42)",
    },
  };
  return (
    <Box sx={{ display: `flex` }}>
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
        elevation={4}
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
            <Box>{/* <img src={logo} alt="logo" /> */}</Box>
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
                <ListItemButton
                  onClick={() => {
                    history.push("/");
                  }}
                  sx={pathname === undefined ? backLink : {}}
                >
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    history.push("/your_nft");
                  }}
                  sx={pathname === "your_nft" ? backLink : {}}
                >
                  <ListItemIcon>
                    <FormatListBulletedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Your NFT" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    history.push("/history");
                  }}
                  sx={pathname === "campaign" ? backLink : {}}
                >
                  <ListItemIcon>
                    <ReceiptLongIcon />
                  </ListItemIcon>
                  <ListItemText primary="History" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    history.push("/auction");
                  }}
                  sx={pathname === "auction" ? backLink : {}}
                >
                  <ListItemIcon>
                    <ShoppingCartCheckoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Auction" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    history.push("/create_nft");
                  }}
                  sx={pathname === "auction" ? backLink : {}}
                >
                  <ListItemIcon>
                    <CloudUploadIcon />
                  </ListItemIcon>
                  <ListItemText primary="Upload" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </ListItem>
            </React.Fragment>
          }
        </List>
        {/* end phan option */}
        <Divider />

        {/* start phan footer */}
        <Box
          sx={{
            display: `flex`,
            flex: `1`,
            alignItems: `flex-end`,
            justifyContent: `center`,
            paddingBottom: `10px`,
          }}
        >
          {/* <img src={bottomSideBar} alt="anhBottom" /> */}
        </Box>
      </Drawer>
    </Box>
  );
}
