import { Box, Typography, TextField, Button } from "@material-ui/core";
import img1 from "../assets/img/img1.png";
import img2 from "../assets/img/img2.png";
import * as React from "react";
import { bgcolor } from "@mui/system";

export default function Auction() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          zIndex: 1,
          justifyContent: "center",
          padding: "16px 50px",
        }}
      >
        <img
          src={img1}
          style={{ maxWidth: "90%", height: "auto" }}
          alt=""
          srcset=""
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          zIndex: 2,
          justifyContent: "space-between",
          marginTop: "-10%",
          flex: 1,
        }}
      >
        <img
          src={img2}
          style={{
            maxWidth: "21%",
            height: "auto",
            marginLeft: "10%",
            flex: 1,
          }}
          alt=""
          srcset=""
        />

        <Box
          sx={{
            display: "flex",
            marginTop: "10%",
            flex: 2,
            padding: "0px 30px",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3" gutterBottom>
            Campaign Title
          </Typography>
          <Typography variant="body1" gutterBottom>
            Remaining Time ( End at)
          </Typography>
          <Box
            sx={{
              padding: "8px 16px",
              bgcolor: "#fff",
              maxWidth: "300px",
              border: "1px solid #ccc",
              borderRadius: "30px",
              marginBottom: "8px",
            }}
          >
            <Typography variant="h5">Current Value</Typography>
          </Box>
          <Typography variant="subtitle1" gutterBottom>
            Description
          </Typography>
          <Typography align="justify" paragraph>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est
            tenetur qui, magnam unde nobis similique labore rerum temporibus, a
            sit dolor! Animi, voluptates saepe possimus ex dicta quam sequi
            dolores!
          </Typography>
        </Box>
        <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
          <Button
            style={{
              borderRadius: 35,
              backgroundColor: "#21b6ae",
              padding: "18px 36px",
              fontSize: "18px",
            }}
            variant="contained"
            size="large"
          >
            Make Offer
          </Button>
        </Box>
      </Box>
    </>
  );
}
