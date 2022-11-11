import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchAuctionNFT } from "../actions/solidity";
import NFTItem from "../components/NFTItem";
import {
    Box,
  } from "@mui/material";


function Your_NFT() {
    
    const listNFT = useSelector((state)=>state.solidity.nftList);
    
    console.log('list NFT',listNFT);  
    
    return ( <div className="wrapper">
       <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}>
            {listNFT ? listNFT.map((nft)=>(
                <NFTItem key={nft.id} title={nft.name} price={nft.highestBid} remainingTime={nft.endAt} ></NFTItem>
            )):'There is No Auction NFT'}          
       </Box>
    </div> );
}

export default Your_NFT;