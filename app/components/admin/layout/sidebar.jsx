import React, { useState, useEffect } from "react";
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
import { useRouter, usePathname } from "next/navigation"; // Use useRouter from next/router
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AssessmentIcon from "@mui/icons-material/Assessment";

import { useTheme } from "@/contexts/themeContext";

const menuItems = [
  { text: "จัดการรายการ", icon: <FactCheckIcon />, path: "/admin" },
  { text: "รายงาน", icon: <AssessmentIcon />, path: "/admin/report" },
  // {
  //   text: "Users",
  //   icon: <DashboardIcon />,
  //   subItems: [
  //     { text: "Add User", path: "/admin/add" },
  //     { text: "Manage Users", path: "/admin/manage" },
  //   ],
  // },
  // { text: "Settings", icon: <DashboardIcon />, path: "/admin/settings" },
];

const Sidebar = ({ setDrawerOpen }) => {
  const router = useRouter(); // Ensure using next/router
  const pathname = usePathname();
  const { theme } = useTheme();
  const [open, setOpen] = useState({});
  const [activePath, setActivePath] = useState("/admin");

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const handleNavigation = (path) => {
    setActivePath(path);
    router.push(path);
    if (setDrawerOpen) {
      setDrawerOpen(false);
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
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item, index) => {
            const isActive = activePath === item.path;
            return (
              <React.Fragment key={index}>
                <ListItem
                  onClick={() =>
                    item.path
                      ? handleNavigation(item.path)
                      : handleClick(item.text)
                  }
                  sx={{
                    cursor: "pointer",
                    backgroundColor: isActive ? theme.activeBackground : "",
                    color: isActive ? theme.activeText : theme.text,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? theme.activeText : theme.text,
                      minWidth: 35,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ fontSize: theme.fontSize }}
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
                   {item.subItems.map((subItem, subIndex) => {
                     const isSubItemActive = activePath === subItem.path;
                     return (
                       <ListItem
                         key={subIndex}
                         onClick={() => handleNavigation(subItem.path)}
                         sx={{
                           pl: 4,
                           cursor: "pointer",
                           backgroundColor: isSubItemActive
                             ? theme.activeBackground
                             : "",
                           color: isSubItemActive
                             ? theme.activeText
                             : theme.text,
                         }}
                       >
                         <ListItemText
                           primary={subItem.text}
                           sx={{ fontSize: theme.fontSize }}
                         />
                       </ListItem>
                     );
                   })}
                 </List>
               </Collapse>
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
