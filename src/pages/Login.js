// src/pages/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, CssBaseline, Box } from '@mui/material';
import AuthForm from '../components/AuthForm';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import config from '../config';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    try {
      const response = await axios.post(`${config.apiBaseUrl}/api/login`, {
        email: email,
        password: password
      });
      console.log('Login record saved:', response.data);
      localStorage.setItem('access_token', response.data.access_token);
      console.log('User is logged in');
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
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
      console.log('Google login record saved:', response.data);
      localStorage.setItem('access_token', response.data.token);
      console.log('User is logged in');
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
          type="login" 
          handleSubmit={handleLogin} 
          handleGoogleLogin={handleGoogleLogin} 
        />
      </Box>
    </Container>
  );
};

export default Login;