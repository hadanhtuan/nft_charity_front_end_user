import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Grid, Box, Container } from '@material-ui/core';
import MarketplaceAbi from './utils/contractsData/Marketplace.json';
import MarketplaceAddress from './utils/contractsData/Marketplace-address.json';
import NFTAbi from './utils/contractsData/NFT.json';
import NFTAddress from './utils/contractsData/NFT-address.json';
import create_nft from './pages/Create_NFT';
import Sidebar from './components/Sidebar';
import Appbar from './components/Appbar';
import { Home } from './pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuctionNFT, fetchSolidity } from './actions/solidity';
import './App.css';
import Auction from './pages/Auction';
import Your_NFT from './pages/Your_NFT';

const App = () => {
  const dispatch = useDispatch();
  dispatch(fetchAuctionNFT());
  const web3Handler = useSelector((state) => state.account);
  return (
    <BrowserRouter>
      <Box className="content" sx={{ width: '100%', height: '100%', display: 'flex' }}>
        {/* sidebar */}
        <Sidebar />

        {/* right part of app */}
        <Box
          className="right_box"
          sx={{
            flex: 1,
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: '#f5f5f5',
          }}
        >
          {/* the appbar  */}
          <Appbar web3Handler={web3Handler ? web3Handler : 'Connect Wallet'} />
          {/* the body before appbar */}
          <Container maxWidth="xl" className="pages_box" style={{ backgroundColor: '#f5f5f5', padding: '16px' }}>
            <Switch>
              <Route path="/create_nft" exact component={create_nft} />
              <Route path="/auction/:nft_id" exact component={Auction} />
              <Route path="/" exact component={Home} />
              <Route path="/list_nft" exact component={Your_NFT} />
            </Switch>
          </Container>
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default App;
