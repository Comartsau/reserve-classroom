"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  Toolbar,
  Typography,
} from "@mui/material";

function AdminHome() {
  const router = useRouter();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = sessionStorage.getItem("login");
    if (userRole === "admin") {
      document.cookie = "token=admin";
      setRole("admin");
    } else {
      router.push("/"); // Redirect to login if not admin
    }

    const handleBeforeUnload = () => {
      localStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [router]);

  if (role !== "admin") {
    return null; // Render nothing until role is confirmed
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar className="bg-black">
          <div className="flex gap-3 align-middle items-center ">
            <img
              src="/15.jpg"
              alt="User profile"
              style={styles.profileImage}
              className=" "
            />
            <Typography component="div" className=" text-lg ms-5">
              warakorn Munthongsuk
            </Typography>
          </div>
        </Toolbar>
      </AppBar>

      <CardContent className=" h-screen bg-gray-200">
        <div className="flex gap-3 items-center justify-around align-middle mt-3 ">
          <Button variant="contained">จองห้องเรียน</Button>
          <Button variant="contained">รายการจอง</Button>
        </div>
      </CardContent>
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

export default AdminHome;
