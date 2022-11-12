import React from "react";
import {
  Grid,
  Box,
  Typography,
  Input,
  Button,
  CssBaseline,
  TextField,
  Card,
} from "@material-ui/core";

import DropButton from "../components/DropButton.jsx";

import { useState } from "react";
import { ethers } from "ethers";
import { Buffer } from "buffer";
import { pinJSONToIPFS } from "../utils/pinata.js";
import { useDispatch, useSelector } from "react-redux";
const Create_NFT = () => {
  const { nftContract, marketplaceContract } = useSelector(
    (state) => state.solidity
  );
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [buffer, setBuffer] = useState(null);
  const [waiting, setwaiting] = useState("");

  const createNFT = async () => {
    if (!image || !name || !description) return;
    try {
      const sample = {};
      sample.name = image.name;
      const reader = new window.FileReader(); //Interface FileReader trong Javascript được thiết kế để đọc các nguồn dữ liệu trên máy tính của người dùng.
      reader.readAsArrayBuffer(image); // readAsArrayBuffer(blob) – reading data in binary format ArrayBuffer.

      reader.onloadend = () => {
        setBuffer({ buffer: Buffer(reader.result) });
        console.log("buffer", buffer);
      };

      if (buffer === null) {
        return;
      }
      setwaiting("Wait...");
      console.log(waiting);
      const metadata = {};
      metadata.name = name;
      metadata.image = buffer;
      metadata.description = description;

      const pinataResponse1 = await pinJSONToIPFS(metadata);

      if (!pinataResponse1.success) {
        setwaiting("Error try again");
        console.log(waiting);
        return {
          success: false,
          status: "Something went wrong while uploading your tokenURI.",
        };
      }
      const tokenURI = pinataResponse1.pinataUrl;
      console.log("token uri", tokenURI);

      mintThenList(tokenURI);
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
    }
  };
  const mintThenList = async (result) => {
    const uri = result;
    console.log(uri);

    try {
      await (await nftContract.mint(uri)).wait();
      // get tokenId of new nft
      const id = await nftContract.tokenCount();
      // approve marketplace to spend nft
      await (
        await nftContract.setApprovalForAll(marketplaceContract.address, true)
      ).wait();
      // add nft to marketplace
      // const listingPrice = ethers.utils.parseEther(price.toString())
      await (
        await marketplaceContract.makeItem(nftContract.address, id)
      ).wait();
      console.log("item count: ", marketplaceContract.itemCount());
      setwaiting("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="create_nft">
      {/* Cssbaseline */}
      <CssBaseline />
      {/* start left box to upload nft */}
      <Card
        className="create_nft_left"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Title */}
        <Box mb={5}>
          <Typography variant="h6">NFT Content</Typography>
          {/* Title description */}
          <Typography variant="body2">
            You can set preferred display name, create your profile, URL and
            manage other personal settings
          </Typography>
          {/* type of upload */}
          <Typography variant="body2">
            Upload image, video, audio, or 3d model. File types supported: JPG,
            PNG, GIF, MP4, WEBM.
          </Typography>
          {/* support types */}
          <Typography variant="body2" gutterBottom>
            max size: 20 MB
          </Typography>
          {/* Box upload  */}
        </Box>

        <DropButton setImage={setImage} />
      </Card>
      {/* end left box to upload nft */}
      {/* start right box to set nft interface */}
      <Card
        className="create_nft_right"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* title */}
          <Typography variant="h6" gutterBottom>
            NFT Content
          </Typography>

          {/* input name */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            <TextField
              variant="standard"
              label="Name"
              multiline
              type="text"
              maxRows={4}
              onChange={(e) => setName(e.target.value)}
            />

            {/* input description */}
            <TextField
              variant="outlined"
              label="Description"
              multiline
              type="text"
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
        </Box>

        {/* button create nft*/}
        <Button variant="outlined" onClick={createNFT} size="lg">
          Create & List NFT!
        </Button>
      </Card>
      {/* end right box to set nft interface */}
    </Box>
  );
};

export default Create_NFT;
