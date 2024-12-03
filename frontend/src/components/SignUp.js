import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use navigate for redirection

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            console.log('Response:', response); // Debug response

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || 'Something went wrong');
            }

            const data = await response.json();
            console.log('User registered:', data);
            alert('Registration successful!');
            navigate('/login'); // Redirect to login page after success
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
            <h2>Sign Up</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <TextField
                label="Name"
                name="name"
                variant="outlined"
                fullWidth
                value={formData.name}
                onChange={handleChange}
            />
            <TextField
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                value={formData.password}
                onChange={handleChange}
            />
            <Button variant="contained" type="submit" fullWidth>
                Sign Up
            </Button>
        </Box>
    );
};

export default SignUp;
