import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any existing error

        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
            if (response.ok) {
                // Store the token
                localStorage.setItem('token', data.token);
                // Redirect to profile page
                navigate('/profile');
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 400,
                margin: 'auto',
                mt: 5,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <TextField
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />
            <Button variant="contained" type="submit" fullWidth>
                Login
            </Button>
        </Box>
    );
};

export default Login;
