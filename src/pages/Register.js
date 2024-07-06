// src/pages/Register.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, CssBaseline, Box } from '@mui/material';
import AuthForm from '../components/AuthForm';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import config from '../config';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get('first_name');
    const lastName = data.get('last_name');
    const mobileNumber = data.get('mobile_number');
    const userName = data.get('user_name');
    const email = data.get('email');
    const password = data.get('password');
    const avatarColor = data.get('avatarColor') || '#ff5722'; // default color
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

    try {
      // Send registration data to Laravel API
      const response = await axios.post(`${config.apiBaseUrl}/api/register`, {
        first_name: firstName,
        last_name: lastName,
        mobile_number: mobileNumber,
        user_name: userName,
        email: email,
        password: password,
        avatar_color: avatarColor,
        initials: initials
      });
      console.log('Registration record saved:', response.data);
      localStorage.setItem('access_token', response.data.access_token);
      console.log('User is registered and logged in');
      navigate('/home');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google login successful:', result.user);

      const response = await axios.post(`${config.apiBaseUrl}/api/google_register`, {
        displayName: result.user.displayName,
        email: result.user.email
      });
      console.log('Google registration record saved:', response.data);
      localStorage.setItem('access_token', response.data.access_token);
      console.log('User is registered and logged in');
      navigate('/home');
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box 
        sx={{ 
          mt: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <AuthForm 
          type="register" 
          handleSubmit={handleRegister} 
          handleGoogleLogin={handleGoogleLogin} 
        />
      </Box>
    </Container>
  );
};

export default Register;