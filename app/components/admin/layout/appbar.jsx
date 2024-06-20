// components/AppbarComponent.jsx
import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { useTheme } from "@/contexts/themeContext";

const AppbarComponent = ({ isSmallScreen, handleDrawerToggle }) => {
  const { theme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("login");
    router.push("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        ml: !isSmallScreen ? `${theme.menuWidth}px` : 0,
        backgroundColor: "#093165",
      }}
    >
      <Toolbar className="justify-between">
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
          ระบบจอง <span style={{ color: "#df9e10" }}>ห้องเรียน</span>
        </Typography>
        <IconButton color="inherit" onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppbarComponent;
