import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token
        setIsLoggedIn(false); // Update state to reflect logout
        navigate('/login'); // Redirect to login page
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" href="/">Home</Button>
                {isLoggedIn ? (
                    <>
                        <Button color="inherit" href="/profile">Profile</Button>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" href="/login">Login</Button>
                        <Button color="inherit" href="/signup">Sign Up</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
