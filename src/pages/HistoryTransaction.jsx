import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Box, CircularProgress, Typography } from "@mui/material";
import {fromWei, account_admin} from '../utils'
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
const etherscanApi = (acc) =>
  `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${acc}&startblock=0&endblock=99999999&sort=asc&apikey=WYDQJ7MTFSEQENZJIZ1P3V8F75VVKIURMA`;

const displayInfo = {
  type: "", //mint NFT, bid, donate,
  to: "",
  timestamp: "",
  value: 0,
  gasPrice: 0,
  hash: "",
};

const linkStyle = {
  textDecoration: "none",
  color: 'rgb(0, 221, 162)',
  overflow: 'hidden'
};

const linkStyle2 = {
  textDecoration: "none",
  color: 'rgb(0, 221, 162)',
};

const etherscanHash = (hash) => `https://goerli.etherscan.io/tx/${hash}`
const etherscanAcc = (acc) => `https://goerli.etherscan.io/address/${acc}`

const columns = [
  { field: "hash", headerName: "Hash code", width: 300,  renderCell: (params) => {
    return <Link to={{pathname: etherscanHash(params.row.hash)}} target="_blank" style={linkStyle}>{params.row.hash}</Link>},
  },
  { field: "type", headerName: "Type", width: 200 },
  {
    field: "timestamp",
    headerName: "Time",
    width: 200,
    renderCell: (params) => {
      const a = new Date(params.row.timestamp * 1000);
      return <p>{a.toLocaleString()}</p>
    },
  },
  { field: "to", headerName: "To", width: 250,  renderCell: (params) => {
    return <Link to={{pathname: etherscanAcc(params.row.to)}} target="_blank" style={linkStyle}>{params.row.to}</Link>},
  },
  { field: "value", headerName: "Value", width: 200 },
  { field: "gasPrice", headerName: "Gas Price", width: 200 },
];

const HistoryTransaction = () => {
  const [trans, setTrans] = useState([]);
  console.log(trans);
  const { account } = useSelector((state) => state.solidity);
  const history = useHistory

  useEffect(() => {
    fetch(etherscanApi(account))
      .then((res) => res.json())
      .then((json) => {
        let arr = [];
        console.log(json.result);
        json.result.reverse().map((item) => {
          if (item.to.toLowerCase() == account_admin.toLowerCase())
            arr.push({
              type: "Donate ETH",
              to: item.to,
              timestamp: item.timeStamp,
              value: fromWei(item.value)+' ETH',
              gasPrice: Number(fromWei(item.gasPrice)).toFixed(14)+' ETH',
              hash: item.hash,
            });
          else if (item.functionName.includes("bid"))
            arr.push({
              type: "Bid",
              to: item.to,
              timestamp: item.timeStamp,
              value: fromWei(item.value)+' ETH',
              gasPrice: Number(fromWei(item.gasPrice)).toFixed(14)+' ETH',
              hash: item.hash,
            });
          else if (item.functionName.includes("mint"))
            arr.push({
              type: "Mint NFT",
              to: item.to,
              timestamp: item.timeStamp,
              value: '',
              gasPrice: Number(fromWei(item.gasPrice)).toFixed(14)+' ETH',
              hash: item.hash,
            });
          setTrans(arr);
        });
      });
  }, [account]);


  return (
    <>
      <h1 style={{ marginLeft: "24px", textTransform: "uppercase" }}>
        History Transaction
      </h1>
      <Box sx={{ height: "75vh", width: "100%", padding: "0 24px" }}>
        {!trans?.length ? (
          <CircularProgress />
        ) : (
          <DataGrid
            headerHeight={40}
            rowHeight={56}
            rows={trans}
            columns={columns}
            getRowId={(row) => row.hash}
            pageSize={8}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        )}
      </Box>
    </>
  );
};

export default HistoryTransaction;
