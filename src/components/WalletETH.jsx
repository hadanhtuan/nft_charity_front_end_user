import React, { useState, useEffect } from 'react';
import { Typography, Card, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { CONNECT_ACC } from '../constraint/actionTypes';
import { transactABI, transactAddress } from '../utils/constants';
import { ethers } from 'ethers';
import { fetchAuctionNFT } from '../actions/solidity';

const getContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(transactAddress, transactABI, signer);
  console.log(contract);
  return contract;
};

function WalletETH() {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  let accounts;

  useEffect(() => {
    dispatch(fetchAuctionNFT());
  }, []);

  const web3Handler = async () => {
    // connect metamask
    accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Get signer
    const signer = provider.getSigner();

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    });

    window.ethereum.on('accountsChanged', async function (accounts) {
      await web3Handler();
    });
    dispatch({
      type: CONNECT_ACC,
      payload: {
        account: accounts[0],
      },
    });
  };

  const handleSend = async () => {
    try {
      if (window.ethereum) {
        //get transac contract
        const contract = getContract();
        //parese to ETH
        const amount_eth = ethers.utils.parseEther(amount);

        const addressTo = '0xc368b89E3Ab7F827AA2dd25E79d1F2bf0621A6FE';

        //request send eth
        await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: accounts[0],
              to: addressTo,
              gas: '0x5208',
              value: amount_eth._hex,
            },
          ],
        });

        const contractHash = await contract.addToBlockchain(addressTo, amount_eth);

        setIsLoading(true);

        console.log('Loading ', contractHash.hash);

        await contractHash.wait();

        console.log('Success', contractHash.hash);

        setIsLoading(false);

        const transCount = await contract.getTransactionCount();

        setCount(transCount.toNumber());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    if (!window.ethereum) return alert('Please install metamask first');
    if (!accounts) {
      web3Handler();
    } else {
      handleSend();
    }
  };

  const account_data = useSelector((state) => state.solidity.account);
  const [amount, setAmount] = useState(0);
  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: '#fff',
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <input
        value={amount}
        step="0.001"
        type="number"
        placeholder="Amount"
        onChange={(e) => {
          console.log(e.target.value);
          setAmount(e.target.value);
        }}
      ></input>
      <Button onClick={handleClick} variant="contained" sx={{ height: '80px', width: '80%', alignSelf: 'center' }}>
        <Typography>{account_data ? 'Donate' : 'Connect to Wallet'}</Typography>
      </Button>
    </Card>
  );
}

export default WalletETH;
