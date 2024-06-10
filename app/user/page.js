/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import liff from "@line/liff";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

const User = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
        if (!liffId) {
          throw new Error("LIFF ID is not set in environment variables");
        }
        await liff.init({ liffId: liffId });
        if (liff.isLoggedIn()) {
          const userProfile = await liff.getProfile();
          setProfile(userProfile);

          // Set a cookie to indicate LIFF login
          document.cookie = "liff_token=1; path=/";
          document.cookie = "user_permition=user; path=/";
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
    return (
      <div>
        <p>Loading user profile...</p>
      </div>
    );
  }

  console.log(profile.pictureUrl);

  return (
    <div>
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
          <div className="flex gap-3 items-center justify-between align-middle mt-3">
            <Button>จองห้องเรียน</Button>
            <Button>รายการจอง</Button>
          </div>
      </AppBar>
      <div className="flex gap-3 items-center justify-around  align-middle mt-3">
        <Button variant="contained">จองห้องเรียน</Button>
        <Button variant="contained">รายการจอง</Button>
      </div>
    </div>
    // <div style={styles.container}>
    //   <h1 style={styles.heading}>User Profile</h1>
    //   <div style={styles.profileContainer}>
    //     <img
    //       src={profile.pictureUrl}
    //       alt="User profile"
    //       style={styles.profileImage}
    //     />
    //     <div style={styles.profileDetails}>
    //       <p>
    //         <strong>Name:</strong> {profile.displayName}
    //       </p>
    //       <p>
    //         <strong>Status Message:</strong> {profile.statusMessage}
    //       </p>
    //       <p>
    //         <strong>User ID:</strong> {profile.userId}
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
};

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
    marginBottom: "20px",
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
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  },
  profileDetails: {
    textAlign: "center",
  },
};

export default User;
