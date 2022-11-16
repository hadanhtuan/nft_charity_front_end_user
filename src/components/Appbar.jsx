import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import { useSelector } from "react-redux";

import "../styles/components/Appbar.scss";
import { Button } from "@mui/material";

// styled search
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

// style search icon
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

// style input base
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar({ web3Handler }) {
  const account = useSelector((state) => state.solidity.account);
  return (
    <Box className="Appbar">
      <AppBar className="MyAppBar" position="static">
        <Toolbar className="MyAppBar__toolbar">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box className="optional">
            <Button
              className="createNFT_button"
              color="inherit"
              variant="outlined"
              startIcon={<BorderColorIcon />}
            >
              Create
            </Button>

            <Button
              color="inherit"
              variant="outlined"
              className="Donate_button"
              startIcon={<BloodtypeIcon />}
            >
              Donate
            </Button>
            <Button
              className="Connect_button"
              color="inherit"
              variant="outlined"
              onClick={() => {
                account ? console.log("") : web3Handler();
              }}
            >
              {account
                ? `${account.slice(0, 5) + "..." + account.slice(38, 42)}`
                : "Connect Wallet"}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
