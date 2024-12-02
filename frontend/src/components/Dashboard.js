import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
      } else {
        alert("Failed to fetch user data");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      {user && (
        <>
          <Typography>Name: {user.name}</Typography>
          <Typography>Email: {user.email}</Typography>
          <Button onClick={handleLogout} variant="contained" color="secondary">
            Logout
          </Button>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
