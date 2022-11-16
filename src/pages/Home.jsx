import React from "react";
import { Box, Typography, Card } from "@mui/material";
import Slider from "../components/Slider";

import { useSelector } from "react-redux";
import NFTItem from "../components/NFTItem";
import ItemCampaign from "../components/ItemCampaign";
import WalletETH from "../components/WalletETH";

// import style file
import "../styles/pages/Home.scss";

const NFTList = () => {
  const listNFT = useSelector((state) => state.solidity.nftList);
  return (
    <Card className="listNFT">
      <Box className="container">
        <Box className="listNFT__title">
          <Typography variant="h4">NFT</Typography>
          <Typography variant="subtitle1" fontWeight={700}>
            See more...
          </Typography>
        </Box>
        <Box className="listNFT__content">
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
            <Typography>There are no auctions campaign right now!</Typography>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export const Home = () => {
  return (
    <Box className="homePages">
      <Box className="theFirst">
        {/* slider */}
        <Card className="slider">
          <Slider />
        </Card>

        {/* list campaign */}
        <Card className="listCampaign">
          <Box className="container">
            <Box className="listCampaign__title">
              <Typography variant="h4">New Campaign</Typography>
              <Typography variant="subtitle1" fontWeight={700}>
                See more...
              </Typography>
            </Box>
            <Box className="listCampaign__content">
              <ItemCampaign />
              <ItemCampaign />
              <ItemCampaign />
            </Box>
          </Box>
        </Card>
      </Box>
      <Box className="theSecond">
        <NFTList />
        <WalletETH />
      </Box>
    </Box>
  );
};
