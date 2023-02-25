import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Grid, Box, Container, ThemeProvider } from "@mui/material";
import { ethers } from "ethers";
import MarketplaceAbi from "./utils/contractsData/Marketplace.json";
import MarketplaceAddress from "./utils/contractsData/Marketplace-address.json";
import NFTAbi from "./utils/contractsData/NFT.json";
import NFTAddress from "./utils/contractsData/NFT-address.json";
import Create_nft from "./pages/Create_NFT";
import Sidebar from "./components/Sidebar";
import Appbar from "./components/AppComponent/Appbar";
import { CONNECT_ACC } from "./constraint/actionTypes";
import { Home } from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { fetchSolidity } from "./actions/solidity";
import "./App.css";
import Account from "./pages/Account";
import createTheme from "@mui/material/styles/createTheme";
import ErrorPages from "./pages/ErrorPages";
import HistoryTransaction from "./pages/HistoryTransaction";
import { HomeMax } from "@mui/icons-material";
import AuctionDetail from "./pages/AuctionDetail";
import AllAuction from "./pages/AllAuction";
import Search from "./pages/Search";
// import AuctionDetail from "./pages/AuctionDetail";

const App = () => {
  const dispatch = useDispatch();
  const ac = useSelector((state) => state.solidity.account);
  let accounts;
  const clearAccount = () => {
    dispatch({
      type: CONNECT_ACC,
      payload: {
        account: "",
      },
    });
    localStorage.setItem("acc", "");
    window.location.reload();
  };

  const web3Handler = async () => {
    // connect metamask
    accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Set signer
    const signer = provider.getSigner();
    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", clearAccount);
    console.log(accounts);
    dispatch({
      type: CONNECT_ACC,
      payload: {
        account: accounts[0],
      },
    });
    localStorage.setItem("acc", accounts[0]);

    dispatch(fetchSolidity());
  };

  useEffect(() => {
    // web3Handler();
    window.addEventListener("beforeunload", (e) => {
        localStorage.removeItem("acc");
    });

    const acc = localStorage.getItem("acc");
    dispatch({
      type: CONNECT_ACC,
      payload: {
        account: acc,
      },
    });

    dispatch(fetchSolidity());
  });

  // darkmode
  const [darkMode, setDarkMode] = useState(true);

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#fff",
          },
        },
      }),
    [darkMode]
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <Box
          className="content"
          sx={{ width: "100%", height: "100%", display: "flex" }}
        >
          <Sidebar />
          <Box
            className="right_box"
            sx={{
              flex: 1,
              height: "100%",
              overFlow: "hidden",
            }}
          >
            <Appbar web3Handler={web3Handler} />
            <Box className="pages_box">
              <Switch>
                <Route
                  path="/home"
                  exact
                  component={() => <Redirect to="/" />}
                />
                <Route path="/" exact component={Home} />
                <Route
                  path="/create_nft"
                  exact
                  component={() => {
                    return !ac ? <Redirect to="/" /> : <Create_nft />;
                  }}
                />
                <Route
                  path="/history"
                  exact
                  component={() => {
                    return !ac ? <Redirect to="/" /> : <HistoryTransaction />;
                  }}
                />
                <Route
                  path="/auction/:nft_id"
                  exact
                  component={AuctionDetail}
                />

                <Route
                  path="/account"
                  exact
                  component={() => {
                    return !ac ? <Redirect to="/" /> : <Account />;
                  }}
                />
                <Route path="/all-auction" exact component={AllAuction} />
                <Route path="/search" exact component={Search} />
                <Route path="*" component={ErrorPages} />
              </Switch>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
