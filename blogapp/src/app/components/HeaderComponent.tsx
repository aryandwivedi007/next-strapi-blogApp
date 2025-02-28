
"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "../store/store";
import { useLogoutMutation } from "../service/api";
import { resetTokens } from "../store/reducer/authReducer";
import { useRouter } from "next/navigation";

const HeaderComponent = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutMutation();
  const router = useRouter();

  // ✅ Toggle Mobile Menu
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // ✅ Handle Logout
  const handleLogout = async () => {
    await logoutUser().unwrap();
    dispatch(resetTokens());
    router.push("/login");
  };

  // ✅ Navigation Links
  const guestLinks = [
    { label: "Home", path: "/" },
    { label: "Categories", path: "/categories" },
    { label: "About", path: "/about" },
    { label: "Login", path: "/login" },
  ];
  const authLinks = [
    { label: "Home", path: "/" },
    { label: "My Profile", path: "/profile" },
    { label: "My Blogs", path: "/my-blogs" },
    { label: "Create Blog", path: "/createblog" },
  ];

  return (
    <>
      {/* ✅ Desktop Header */}
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: "1px solid #ddd",
          backgroundColor: "white",
          paddingY: 1,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: 1200,
            mx: "auto",
            width: "100%",
          }}
        >
          {/* ✅ Logo */}
          <Typography variant="h5" fontWeight="bold">
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "black",
                fontFamily: "serif",
                fontSize: "1.8rem",
              }}
            >
              MyBlog
            </Link>
          </Typography>

          {/* ✅ Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {(isAuthenticated ? authLinks : guestLinks).map((item) => (
              <Link key={item.label} href={item.path} passHref>
                <Button
                  color="inherit"
                  sx={{
                    textTransform: "none",
                    fontSize: 16,
                    transition: "0.3s",
                    "&:hover": { color: "#000", backgroundColor: "#f5f5f5" },
                  }}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            {isAuthenticated && (
              <Button
                color="error"
                sx={{
                  textTransform: "none",
                  fontSize: 16,
                  transition: "0.3s",
                  "&:hover": { backgroundColor: "#ffe6e6" },
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </Box>

          {/* ✅ Mobile Menu Icon */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={handleDrawerToggle}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ✅ Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250, p: 2 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            MyBlog
          </Typography>
          <List>
            {(isAuthenticated ? authLinks : guestLinks).map((item) => (
              <ListItem button key={item.label} onClick={handleDrawerToggle}>
                <Link href={item.path} passHref style={{ textDecoration: "none", width: "100%" }}>
                  <ListItemText
                    primary={item.label}
                    sx={{ "& span": { fontSize: 16, fontWeight: "bold" } }}
                  />
                </Link>
              </ListItem>
            ))}
            {isAuthenticated && (
              <ListItem button onClick={handleLogout}>
                <ListItemText
                  primary="Logout"
                  sx={{
                    color: "red",
                    "& span": { fontSize: 16, fontWeight: "bold" },
                  }}
                />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default HeaderComponent;
