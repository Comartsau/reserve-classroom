/* eslint-disable @next/next/no-img-element */

"use client";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

const UserLayout = ({
  children,
  profile,
  handleUserPage,
  handleReservePage,
}) => {
//   const router = useRouter();
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   useEffect(() => {
//     const token = sessionStorage.getItem("login");
//     if (!token) {
//       router.push("/"); // Redirect ไปที่หน้า login ถ้าไม่มี token
//     } else {
//       setIsAuthorized(true); // ตั้งค่า state ให้แสดงเนื้อหาถูกต้อง
//     }
//   }, [router]);

//   if (!isAuthorized) {
//     return null; // ไม่แสดงเนื้อหาก่อนตรวจสอบสิทธิ์เสร็จสิ้น
//   }

  return (
    <div className="h-screen bg-gray-300 p-2">
      <AppBar position="static">
        <Toolbar className="bg-black">
          <div className="flex gap-3 align-middle items-center">
            <img
              src={profile.pictureUrl}
              alt="User profile"
              style={styles.profileImage}
            />
            <Typography component="div" className="text-lg ms-5">
              {profile.displayName}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>

      <div className="flex gap-3 items-center align-middle p-2 mt-2">
        <Button variant="contained" onClick={handleUserPage}>
          จองห้องเรียน
        </Button>
        <Button variant="contained" onClick={handleReservePage}>
          รายการจอง
        </Button>
      </div>

      {children}
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
