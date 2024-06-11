"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar";
import {
  Box,
  Toolbar,
  Typography,
  CssBaseline,
  IconButton,
  AppBar,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider, useTheme } from "@/contexts/themeContext";

const AdminHome = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)"); // ใช้ useMediaQuery เพื่อเช็คขนาดหน้าจอ
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("login");
    if (!token) {
      router.push("/"); // Redirect ไปที่หน้า login ถ้าไม่มี token
    } else {
      setIsAuthorized(true); // ตั้งค่า state ให้แสดงเนื้อหาถูกต้อง
    }
  }, [router]);

  if (!isAuthorized) {
    return null; // ไม่แสดงเนื้อหาก่อนตรวจสอบสิทธิ์เสร็จสิ้น
  }

  return (
    <ThemeProvider>
      <AdminHomeContent
        isSmallScreen={isSmallScreen}
        isDrawerOpen={isDrawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    </ThemeProvider>
  );
};

const AdminHomeContent = ({ isSmallScreen, isDrawerOpen, setDrawerOpen }) => {
  const { theme } = useTheme();

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      {!isSmallScreen && <Sidebar />}

      {isSmallScreen && (
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={handleDrawerToggle}
          sx={{ "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 } }}
        >
          <Sidebar setDrawerOpen={setDrawerOpen} />
        </Drawer>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "rgb(229 231 235)",
          height: "100vh",
          overflow: "auto",
          mt: isSmallScreen ? 7 : 0, // เพิ่ม margin top เมื่อไม่ใช่หน้าจอขนาดเล็ก
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            ml: !isSmallScreen ? `${theme.menuWidth}px` : 0,
          }}
        >
          <Toolbar>
            {isSmallScreen && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap component="div">
              ระบบจองห้องเรียน
            </Typography>
          </Toolbar>
        </AppBar>
        {!isSmallScreen && <Toolbar />}
        <Typography >
          Welcome to Admin Home
        </Typography>
        {/* เนื้อหาหลักของหน้า */}
      </Box>
    </Box>
  );
};

export default AdminHome;
