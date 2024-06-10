import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import Image from "next/image";
import React from "react";

function Test() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar className="bg-black">
          <img
            src="/15.jpg"
            alt="User profile"
            style={styles.profileImage}
            className=" "
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           aaaaaaa
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      {/* <AppBar className="flex align-middle justify-center">
        <Container maxWidth="xl">
          <Toolbar>
            <img
              src="/15.jpg"
              alt="User profile"
              style={styles.profileImage}
              className=" "
            />
          </Toolbar>
        </Container>
      </AppBar> */}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
    padding: "20px",
  },
  heading: {
    fontSize: "2em",
    marginBottom: "10px",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  profileImage: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    padding: "10px",
  },
  profileDetails: {
    textAlign: "center",
  },
};

export default Test;
