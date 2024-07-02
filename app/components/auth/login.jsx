// pages/login.js
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { username: user, password: password };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/login`,
        // "http://26.182.55.77:5000/api/login",
        data 
      );
      // console.log(res)
      const token = res.data.token;

      if (token) {
        toast.success("เข้าสู่ระบบสำเร็จ");
        localStorage.setItem("Token", res.data.token);
        sessionStorage.setItem("login", "admin");
        router.push("/admin");
      } else {
        toast.error(error);
      }
    } catch {
      toast.error("ไม่สำเร็จ กรุณาลองอีกครั้ง");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // backgroundImage: "url('/path-to-your-background-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
          className="pt-5 pb-5 px-10"
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="User"
              name="user"
              autoComplete="user"
              autoFocus
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Paper>
      <ToastContainer autoClose={2000} theme="colored" />
    </Container>
  );
};

export default LoginPage;
