// components/AdminHomeContent.jsx
import { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import Sidebar from "./sidebar";
import AppbarComponent from "./appbar";

const AdminHomeContent = ({ children }) => {
  const isSmallScreen = useMediaQuery("(max-width:751px)");
  const [isDrawerOpen, setDrawerOpen] = useState(false);

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
          sx={{ "& .MuiDrawer-paper": { boxSizing: "border-box", width: 170 } }} //ความกว้างของเมนูในหน้าจอเล็ก
        >
          <Sidebar setDrawerOpen={setDrawerOpen} />
        </Drawer>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          // backgroundColor: "rgb(229 231 235)",
          backgroundColor: "rgb(229 231 235)",
          height: "100vh",
          overflow:"auto",
          mt: isSmallScreen ? 7 : 0,
        }}
      >
        <AppbarComponent
          isSmallScreen={isSmallScreen}
          isDrawerOpen={isDrawerOpen}
          setDrawerOpen={setDrawerOpen}
          handleDrawerToggle={handleDrawerToggle}
        />

        {!isSmallScreen && <Toolbar />}
        {children}
      </Box>
    </Box>
  );
};

export default AdminHomeContent;
