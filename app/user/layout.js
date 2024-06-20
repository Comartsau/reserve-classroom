/* eslint-disable @next/next/no-img-element */

"use client";
import React, { useEffect, useState, createContext, useContext } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import liff from "@line/liff";

import axios from "axios";

// Profile context setup
const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

const UserLayout = ({ children }) => {
  const [profile, setProfile] = useState([]);
  // const [profile, setProfile] = useState({
  //   userId: "U92083888a355cc56b56b3b0bfcdc391e",
  //   displayName: "Warakorn Muntongsuk",
  //   pictureUrl:
  //     "https://profile.line-scdn.net/0h3CHpNw6kbGxlCUb4ifQSExVZbwZGeDV-GTwgCgUBYV9RbisyTGwnClgKZlhaOis8SW0nClAMMF5pGhsKe1-QWGI5MV1ZPS88QW8ijQ",
  // });

  const router = useRouter();
  // ต้องการให้หลัง Login Line เสร็จแล้ว ให้เก็บ Token
  const handleLogin = async () => {
    const data = { username: "admin", password: "1234" };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/login`,
        data
      );
      const token = res.data.token;
      if (token) {
        localStorage.setItem("Token", res.data.token);
      } else {
        toast.error(error);
      }
    } catch {
      toast.error("ไม่สำเร็จ กรุณาลองอีกครั้ง");
    }
  };

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
        // Uncomment the lines below if LIFF initialization is needed
        if (!liffId)
          throw new Error("LIFF ID is not set in environment variables");

        await liff.init({ liffId });
        if (liff.isLoggedIn()) {
          await handleLogin();
          const userProfile = await liff.getProfile();
          console.log("userProfile :", userProfile);
          setProfile(userProfile);
          document.cookie = "liff_token=1; path=/";
          document.cookie = "user_permition=user; path=/";

          if (liff.isInClient()) liff.ready.then(() => liff.hide());
        } else {
          liff.login();
        }
      } catch (error) {
        console.error("LIFF Initialization failed:", error);
      }
    };

    initializeLiff();
  }, []);

  if (!profile) {
    return <p>Loading user profile...</p>;
  }

  const handlePageNavigation = (path) => () => {
    router.push(path);
  };

  return (
    <div className="h-screen bg-gray-300 p-2">
      <AppBar position="static">
        <Toolbar className="bg-black">
          <div className="flex gap-3 align-middle items-center">
            {/* <img
              src={profile.pictureUrl  || ''}
              alt="User profile"
              style={styles.profileImage}
            /> */}
            {profile.pictureUrl && (
              <img src={profile.pictureUrl} alt="Profile Picture" />
            )}
            <Typography component="div" className="text-lg ms-5">
              {profile.displayName}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>

      <div className="flex gap-3 items-center align-middle p-2 mt-2">
        <Button variant="contained" onClick={handlePageNavigation("/user")}>
          จองห้องเรียน
        </Button>
        <Button
          variant="contained"
          onClick={handlePageNavigation("/user/reserve")}
        >
          รายการจอง
        </Button>
      </div>

      <ProfileContext.Provider value={{ profile, setProfile }}>
        {children}
      </ProfileContext.Provider>
    </div>
  );
};

const styles = {
  profileImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  },
};

export default UserLayout;
