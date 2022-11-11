import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Card, CardMedia, Button } from '@mui/material';
import Slider from '../components/Slider';

import { useSelector, useDispatch } from 'react-redux';
import { CONNECT_ACC } from '../constraint/actionTypes';
import { transactABI, transactAddress } from '../utils/constants';
import { ethers } from 'ethers';
import NFTItem from '../components/NFTItem';
import ItemCampaign from '../components/ItemCampaign';
import { fetchAuctionNFT } from '../actions/solidity';
import WalletETH from '../components/WalletETH';

const NFTList = () => {
  const listNFT = useSelector((state) => state.solidity.nftList);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <Typography variant="h4">NFT</Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: '700' }}>
          See more...
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '14px' }}>
        {listNFT
          ? listNFT.map((nft) => (
              <NFTItem key={nft.id} title={nft.name} price={nft.highestBid} remainingTime={nft.endAt}></NFTItem>
            ))
          : 'There are no auctions campaign right now!'}
      </Box>
    </Box>
  );
};

export const Home = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flex: 2, flexDirection: 'column' }}>
          <Slider />
          <NFTList />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '0px 24px',
          }}
        >
          {/* information of campaign list demo */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingBottom: '34px',
              gap: '10px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <Typography variant="h4">New Campaign</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: '700' }}>
                See more...
              </Typography>
            </Box>
            <ItemCampaign />
            <ItemCampaign />
            <ItemCampaign />
          </Box>

          {/* the wallet */}
          <WalletETH />
        </Box>
      </Box>
    </>
  );
};
