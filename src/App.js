import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Box, Container } from "@material-ui/core";
import create_nft from "./pages/Create_NFT";
import Sidebar from "./components/Sidebar";
import Appbar from "./components/Appbar";
import { Home } from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuctionNFT } from "./actions/solidity";
import "./App.css";
import Auction from "./pages/Auction";
import Your_NFT from "./pages/Your_NFT";

const App = () => {
  const dispatch = useDispatch();
  dispatch(fetchAuctionNFT());
  const web3Handler = useSelector((state) => state.account);
  return (
    <BrowserRouter>
      <Box className="app">
        {/* sidebar */}
        <Sidebar />

        {/* right part of app */}
        <Box className="content">
          {/* the appbar  */}
          <Appbar web3Handler={web3Handler ? web3Handler : "Connect Wallet"} />
          {/* the body  */}
          <Container maxWidth="xl" className="content_page">
            <Switch>
              <Route path="/create_nft" exact component={create_nft} />
              <Route path="/auction/:nft_id" exact component={Auction} />
              <Route path="/" exact component={Home} />
              <Route path="/your_nft" exact component={Your_NFT} />
            </Switch>
          </Container>
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default App;
