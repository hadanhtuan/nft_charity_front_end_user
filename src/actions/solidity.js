import * as api from '../apis';
import { ethers } from 'ethers';
import MarketplaceAbi from '../utils/contractsData/Marketplace.json';
import MarketplaceAddress from '../utils/contractsData/Marketplace-address.json';
import NFTAbi from '../utils/contractsData/NFT.json';
import NFTAddress from '../utils/contractsData/NFT-address.json';

import { FETCH_NFT, START_LOADING_SOLIDITY, FETCH_SOLIDITY } from '../constraint/actionTypes';

export const fetchSolidity = (accounts) => async (dispatch) => {
  dispatch({ type: START_LOADING_SOLIDITY });
  // Get provider from Metamask
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // Set signer
  const signer = provider.getSigner();

  const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
  const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);

  // console.log("ntf contract: ", nft);
  // console.log("marketplace contract: ", marketplace);

  const itemCount = await marketplace.itemCount();
  // console.log(itemCount);
  let items = [];
  for (let i = 1; i <= itemCount; i++) {
    const item = await marketplace.items(i);
    // console.log("nft number ", i, ": ", item);
    if (!item.isSold) {
      // get uri url from nft contract
      const uri = await nft.tokenURI(item.tokenId);
      // use uri to fetch the nft metadata stored on ipfs
      const response = await fetch(uri);
      // console.log("response nft number ", i, ": ", response);
      const metadata = await response.json();
      // get total price of item (item price + fee)
      // console.log(metadata);
      const thisNft = await marketplace.items(item.itemId);
      // const startPrice = ethers.utils.formatEther(thisNft.startPrice)+'ETH'
      // Add item to items array
      console.log(item);
      items.push({
        id: item.itemId.toNumber(),
        seller: item.seller,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
      });
    }
  }

  dispatch({
    type: FETCH_SOLIDITY,
    payload: {
      nftContract: nft,
      marketplaceContract: marketplace,
      nftList: items,
    },
  });
};

export const fetchAuctionNFT = (accounts) => async (dispatch) => {
  dispatch({ type: START_LOADING_SOLIDITY });
  // Get provider from Metamask
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // Set signer
  const signer = provider.getSigner();

  const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
  const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);

  // console.log('ntf contract: ', nft);
  // console.log('marketplace contract: ', marketplace);
  // console.log('fetching auciton nft...');
  const itemCount = await marketplace.itemCount();
  // console.log(itemCount);
  let items = [];
  for (let i = 1; i <= itemCount; i++) {
    const item = await marketplace.items(i);
    // console.log("nft number ", i, ": ", item);

    let remainingTime = item.endAt.toNumber();

    let time = new Date(remainingTime * 1000);

    let isEnd = Date.now() - time;

    if (!item.isSold && item.isStarted && isEnd < 0) {
      // console.log('endAt ',item.endAt);
      // get uri url from nft contract
      const uri = await nft.tokenURI(item.tokenId);
      // use uri to fetch the nft metadata stored on ipfs
      const response = await fetch(uri);
      // console.log("response nft number ", i, ": ", response);
      const metadata = await response.json();
      // get total price of item (item price + fee)
      // console.log(metadata);
      const thisNft = await marketplace.items(item.itemId);
      const startPrice = ethers.utils.formatEther(thisNft.startPrice);
      // Add item to items array
      //console.log(item);
      items.push({
        startPrice,
        id: item.itemId.toNumber(),
        seller: item.seller,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
        isSold: item.isSold,
        isStarted: item.isStarted,
        endAt: item.endAt.toNumber(),
        highestBid: item.highestBid.toNumber(),
      });
    }
  }
  // console.log('item: ', items);
  dispatch({
    type: FETCH_SOLIDITY,
    payload: {
      nftContract: nft,
      marketplaceContract: marketplace,
      nftList: items,
    },
  });
};
