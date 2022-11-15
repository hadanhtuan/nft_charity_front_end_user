import React from "react";
import { useSelector } from "react-redux";
import NFTItem from "../components/NFTItem";
import { Box, Typography } from "@mui/material";

import "../styles/pages/Your_NFT.scss";

function Your_NFT() {
  const listNFT = useSelector((state) => state.solidity.nftList);

  console.log("list NFT", listNFT);

  return (
    <Box className="yourNFT">
      <Box className="yourNFT__title">
        <Typography variant="h5">Your NFT</Typography>
      </Box>
      <Box className="container">
        {listNFT
          ? listNFT.map((nft) => (
              <NFTItem
                key={nft.id}
                title={nft.name}
                price={nft.highestBid}
                remainingTime={nft.endAt}
              ></NFTItem>
            ))
          : "There is No Auction NFT"}
      </Box>
    </Box>
  );
}

export default Your_NFT;
