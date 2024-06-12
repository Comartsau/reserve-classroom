// components/Sidebar.js
import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  Box,
  Toolbar,
  Divider,
  Typography,
  Collapse,
} from "@mui/material";
import { useRouter } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useTheme } from "@/contexts/themeContext";

const menuItems = [
  { text: "จัดการรายการ", icon: <DashboardIcon />, path: "/admin" },
  { text: "รายงาน", icon: <DashboardIcon />, path: "/admin/report" },
  // {
  //   text: "Users",
  //   icon: <PeopleIcon />,
  //   subItems: [
  //     { text: "Add User", path: "/admin/users/add" },
  //     { text: "Manage Users", path: "/admin/users/manage" },
  //   ],
  // },
  // { text: "Settings", icon: <SettingsIcon />, path: "/admin/settings" },
];

const Sidebar = ({ setDrawerOpen }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const [open, setOpen] = useState({});

  const handleNavigation = (path) => {
    router.push(path);
    if (setDrawerOpen) {
      setDrawerOpen(false); // ปิด Drawer เมื่อเมนูถูกเลือกในหน้าจอขนาดเล็ก
    }
  };

  const handleClick = (text) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [text]: !prevOpen[text],
    }));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: theme.menuWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: theme.menuWidth,
          boxSizing: "border-box",
          backgroundColor: theme.background,
          color: theme.text,
        },
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
           
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontSize: theme.fontSize }}
          >
            Admin Panel
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <Box sx={{ overflow: "auto"   }}  >
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                onClick={() =>
                  item.path
                    ? handleNavigation(item.path)
                    : handleClick(item.text)
                }
                sx={{ cursor: "pointer" }}
              >
                <ListItemIcon sx={{ color: theme.text , minWidth: 35  }} >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ fontSize: theme.fontSize  }}
                />
                {item.subItems ? (
                  open[item.text] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : null}
              </ListItem>
              {item.subItems && (
                <Collapse in={open[item.text]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem, subIndex) => (
                      <ListItem
                        key={subIndex}
                        onClick={() => handleNavigation(subItem.path)}
                        sx={{ pl: 4, cursor: "pointer" }}
                      >
                        <ListItemText
                          primary={subItem.text}
                          sx={{ fontSize: theme.fontSize }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
