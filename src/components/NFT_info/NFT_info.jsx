import React, { useEffect, useState } from "react";

import { Button, Card, Box, Typography, Input } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useDispatch, useSelector } from "react-redux";
import {TRANS_NFT} from '../../constraint/actionTypes'
import * as api from "../../apis";
import AlertLoading from '../AlertLoading'

import styled from "@emotion/styled";
function toBase64(arr) {
  //arr = new Uint8Array(arr) if it's an ArrayBuffer
  return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ""));
}

const NFTItemStyled = styled(Card)`
  width: 300px;

  .wrapper { 
    width: 100%;
    height: 100%;
 
    &:hover {
      .cardButton {
        top: 0 !important;
      }
    }
  }

  .cardContainer {
    display: flex;
    flex-direction: column;

    .cardImg {
      width: 100%;
      height: 300px;
      overflow: hidden;

      .img {
        width: 100%;
        height: 100%;
        object-fit: cover;

        &:hover {
          transform: scale(1.1);
          transition: all 0.5s ease;
        }
      }
    }

    .cardContent {
      padding: 20px;
      display: flex;
      flex-direction: column;

      .cardContent_header {
        width: 100%;

        .contentLeft {
          .title {
            width: 350px;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 5px;
            font-weight: 700;
          }
        }
        .contentRight {
          align-self: center;
          .price {
            width: 100%;
            text-overfow: ellipsis;
            font-size: 1.5rem;
            font-weight: 700;
            text-transform: uppercase;
          }
        }
      }

      .hiddenButtonBox:hover > .cardButton {
        top: 0;
      }
      .cardButton {
        color: lightgreen;
        font-size: 1.2rem;
        text-transform: uppercase;
        font-weight: 700;
        transition: all 0.3s ease-out;
        top: 170%;
        position: relative;
        height: 100%;
        &:hover {
          background-color: lightgreen;
          color: white;
        }
      }
    }
  }
`;

export default function MyNFTInfo({
  id,
  image,
  name,
  description,
  price,
  marketplaceContract,
  nftContract,
  account,
  isSearch
}) {
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const [display, setDisplay] = useState(false)
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const transNFT = async () => {
    setOpen(false);
    setDisplay(true)
    setText('Step 1/1')
    const a = await (
      await marketplaceContract.transItem(nftContract.address, id)
      ).wait();
      console.log(a);
      const trans = {
        trans_id: id,
        account_address: account,
        amount: 0,
        type: 0, //0: donate nft  |  1: donate eth  | 2: auction nft
        description: desc,
      };
      dispatch({
        type: 'TRANS_NFT',
        payload: id
      })
    // await api.createTrans(trans);
     setDisplay(false)
    // handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDesc("");
  };

  return (
    <NFTItemStyled>
      <Box className="wrapper">
        <Box className="cardContainer">
          <Box className="cardImg">
            <img
              className="img"
              src={`data:image/png;base64,${toBase64(image.buffer.data)}`}
              alt="nft_img"
            />
          </Box>
          {display && <AlertLoading text={text} />}
          <Box className="cardContent">
            <Box className="cardContent_header">
              <Box className="contentLeft">
                {/* <Typography className="id">#{id}</Typography> */}
                <Typography className="title" gutterBottom>
                  {name}
                  {"  #"}
                  {id}
                </Typography>
              </Box>
              <Box className="contentRight">
                <Typography className="price">{price} ETH</Typography>
              </Box>
            </Box>
            {!isSearch && 
            <Box height={30} className="hiddenButtonBox">
              <Button
                className="cardButton"
                variant="outlined"
                fullWidth
                onClick={handleClickOpen}
                >
                Donate this NFT
              </Button>
            </Box>
              }
          </Box>

          {/* the dialog will appear when we click button donate */}
          <Dialog keepMounted open={open} onClose={handleClose}>
            <DialogTitle>Transform NFT To System</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To transform NFT please enter short description and submit. We
                thank you for your contribution.
              </DialogContentText>
              <TextField
                margin="dense"
                label="NFT Name"
                value={name}
                fullWidth
                variant="standard"
                sx={{ marginTop: "20px" }}
              />
              <TextField
                autoFocus
                margin="dense"
                label="Short Description"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                fullWidth
                variant="standard"
                sx={{ marginTop: "10px" }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={transNFT}>Submit</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </NFTItemStyled>
  );
}
