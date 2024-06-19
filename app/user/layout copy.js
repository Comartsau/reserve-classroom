/* eslint-disable @next/next/no-img-element */

"use client";
import React, { useEffect, useState  ,createContext, useContext } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import liff from "@line/liff";

const ProfileContext = createContext();

const UserLayout = ({ children }) => {
  // const [profile, setProfile] = useState(null);
  const [profile, setProfile] = useState({
    userId: "U92083888a355cc56b56b3b0bfcdc391e",
    displayName: "Warakorn Muntongsuk",
    pictureUrl:
      "https://profile.line-scdn.net/0h3CHpNw6kbGxlCUb4ifQSExVZbwZGeDV-GTwgCgUBYV9RbisyTGwnClgKZlhaOis8SW0nClAMMF5pGhsKe1-QWGI5MV1ZPS88QW8ijQ",
  });
  const router = useRouter();
  useEffect(() => {
    const initializeLiff = async () => {
      try {
        const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
        // if (!liffId) {
        //   throw new Error("LIFF ID is not set in environment variables");
        // }
        // await liff.init({ liffId: liffId });
        // if (liff.isLoggedIn()) {
        //   const userProfile = await liff.getProfile();
        //   console.log(userProfile)
        //   setProfile(userProfile);

        //   // Set a cookie to indicate LIFF login
        //   document.cookie = "liff_token=1; path=/";
        //   document.cookie = "user_permition=user; path=/";

        //   // Hide the title bar in Line LIFF
        //   if (liff.isInClient()) {
        //     liff.ready.then(() => {
        //       liff.hide();
        //     });
        //   }
        // } else {
        //   liff.login();
        // }
      } catch (error) {
        console.error("LIFF Initialization failed:", error);
      }
    };

    initializeLiff();
  }, []);

  if (!profile) {
    return (
      <div>
        <p>Loading user profile...</p>
      </div>
    );
  }

  const handleReservePage = () => {
    router.push("/user/reserve");
  };
  const handleUserPage = () => {
    router.push("/user");
  };

  return (
    <div className="h-screen bg-gray-300 p-2">
      <AppBar position="static">
        <Toolbar className="bg-black">
          <div className="flex gap-3 align-middle items-center ">
            <img
              src={profile.pictureUrl}
              alt="User profile"
              style={styles.profileImage}
              className=" "
            />
            <Typography component="div" className=" text-lg ms-5">
              {profile.displayName}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>

      <div className="flex gap-3 items-center  align-middle p-2 mt-2 ">
        <Button variant="contained" onClick={handleUserPage}>
          จองห้องเรียน
        </Button>
        <Button variant="contained" onClick={handleReservePage}>
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

export const useProfile = () => {
  return useContext(ProfileContext);
};

export default UserLayout;
