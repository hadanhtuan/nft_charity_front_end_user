import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardMedia,
  Button,
} from "@mui/material";
import Slider from "../components/Slider";

import { useSelector, useDispatch } from "react-redux";
import { CONNECT_ACC } from "../constraint/actionTypes";
import { transactABI, transactAddress } from "../utils/constants";
import { ethers } from "ethers";
import NFTItem from "../components/NFTItem";
import ItemCampaign from "../components/ItemCampaign";
import { fetchAuctionNFT } from "../actions/solidity";
import WalletETH from "../components/WalletETH";

import "../styles/pages/Home.scss";

const NFTList = () => {
  const listNFT = useSelector((state) => state.solidity.nftList);
  return (
    <Box className="list_nft">
      <Box className="list_nft__title">
        <Typography variant="h4">NFT</Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: "700" }}>
          See more...
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: "14px" }}>
        {listNFT ? (
          listNFT.map((nft) => (
            <NFTItem
              key={nft.id}
              title={nft.name}
              price={nft.highestBid}
              remainingTime={nft.endAt}
            ></NFTItem>
          ))
        ) : (
          <Typography>"There are no auctions campaign right now!"</Typography>
        )}
      </Box>
    </Box>
  );
};

export const Home = () => {
  return (
    <Box className="home_pages">
      <Box className="left_side">
        <Slider />
        <NFTList />
        {/* information of campaign list demo */}
      </Box>
      <Box className="right_side">
        <Card className="list_campaign">
          <Box className="title">
            <Typography variant="h6">New Campaign</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: "700" }}>
              See more...
            </Typography>
          </Box>
          <ItemCampaign />
          <ItemCampaign />
          <ItemCampaign />
        </Card>
        {/* the wallet */}
        {/* <WalletETH /> */}
      </Box>
    </Box>
  );
};
