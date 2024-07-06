// src/components/AuthForm.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, Link, Avatar, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';

const colorOptions = ['#ff5722', '#4caf50', '#2196f3', '#ffeb3b', '#9c27b0'];

const AuthForm = ({ type, handleSubmit, handleGoogleLogin }) => {
  const [color, setColor] = useState(colorOptions[0]);
  const [initials, setInitials] = useState('');

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleInitialsChange = (event) => {
    const { name, value } = event.target;
    setInitials((prevState) => {
      const names = { ...prevState, [name]: value };
      return `${names.first_name?.charAt(0) || ''}${names.last_name?.charAt(0) || ''}`.toUpperCase();
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ 
        mt: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '100%', 
        maxWidth: 480, 
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'background.paper'
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        {type === 'login' ? 'Welcome back' : 'Sign up'}
      </Typography>
      {type === 'register' && (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          fullWidth
          sx={{ mt: 3, mb: 2, py: 1.5 }}
        >
          Sign up with Google
        </Button>
      )}
      <TextField 
        margin="normal" 
        required 
        fullWidth 
        label="Email" 
        name="email" 
        autoComplete="email" 
        autoFocus 
        sx={{ mb: 2 }} 
      />
      <TextField 
        margin="normal" 
        required 
        fullWidth 
        name="password" 
        label="Password" 
        type="password" 
        autoComplete="current-password" 
        sx={{ mb: 2 }} 
      />
      {type === 'register' && (
        <>
          <TextField 
            margin="normal" 
            required 
            fullWidth 
            label="First Name" 
            name="first_name" 
            onChange={handleInitialsChange}
            sx={{ mb: 2 }} 
          />
          <TextField 
            margin="normal" 
            required 
            fullWidth 
            label="Last Name" 
            name="last_name" 
            sx={{ mb: 2 }} 
          />
          <TextField 
            margin="normal" 
            required 
            fullWidth 
            label="Mobile Number" 
            name="mobile_number" 
            sx={{ mb: 2 }} 
          />
          <TextField 
            margin="normal" 
            required 
            fullWidth 
            label="Username" 
            name="user_name" 
            sx={{ mb: 2 }} 
          />
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2 }}>
            <Avatar sx={{ bgcolor: color, width: 56, height: 56, mr: 2 }}>
              {initials}
            </Avatar>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Color</InputLabel>
              <Select
                value={color}
                onChange={handleColorChange}
                label="Color"
                name="avatarColor"
              >
                {colorOptions.map((colorOption) => (
                  <MenuItem key={colorOption} value={colorOption} style={{ backgroundColor: colorOption }}>
                    {colorOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </>
      )}
      <Button 
        type="submit" 
        fullWidth 
        variant="contained" 
        color="primary" 
        sx={{ mt: 3, mb: 2, py: 1.5 }}
      >
        {type === 'login' ? 'Login' : 'Sign up'}
      </Button>
      <Grid container justifyContent="center">
        <Grid item>
          <Link href={type === 'login' ? "/register" : "/login"} variant="body2">
            {type === 'login' ? "Don't have an account? Sign up for Free" : "Already have an account? Login"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthForm;