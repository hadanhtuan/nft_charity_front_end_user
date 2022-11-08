import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Grid, Box } from "@material-ui/core";
import { ethers } from "ethers";
import MarketplaceAbi from "./utils/contractsData/Marketplace.json";
import MarketplaceAddress from "./utils/contractsData/Marketplace-address.json";
import NFTAbi from "./utils/contractsData/NFT.json";
import NFTAddress from "./utils/contractsData/NFT-address.json";
import create_nft from "./pages/Create_NFT";
import Sidebar from "./components/Sidebar";
import Appbar from "./components/Appbar";
import { FETCH_SOLIDITY } from "./constraint/actionTypes";

import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import Auction from "./pages/Auction";
import Home from "./pages/Home";

const App = () => {
  const dispatch = useDispatch();

  // MetaMask Login/Connect

  useEffect(() => {
    web3Handler();
  }, []);
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    const signer = provider.getSigner();

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async function (accounts) {
      await web3Handler();
    });

    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);

    console.log("ntf contract: ", nft);
    console.log("marketplace contract: ", marketplace);
    dispatch({
      type: FETCH_SOLIDITY,
      payload: {
        account: accounts[0],
        nftContract: nft,
        marketplaceContract: marketplace,
      },
    });
  };
  return (
    <BrowserRouter>
      <Box
        className="body_box"
        sx={{ width: "100%", height: "100%", display: "flex" }}
      >
        {/* sidebar */}
        <Sidebar />

        {/* right part of app */}
        <Box
          className="right_box"
          sx={{
            width: "calc(100% - 200px)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* the appbar  */}
          <Appbar web3Handler={web3Handler} />
          {/* the body before appbar */}
          <Box
            className="pages_box"
            sx={{ bgcolor: "#f5f5f5", width: "100%", height: "100%" }}
          >
            <Switch>
              <Route path="/create_nft" exact component={create_nft} />
              <Route path="/auction" exact component={Auction} />
              <Route path="/" exact component={Home} />
            </Switch>
          </Box>
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default App;
