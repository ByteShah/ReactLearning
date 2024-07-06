import React from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import AuthForm from '../components/AuthForm';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';

const Login = () => {
  const handleLogin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    try {
      const response = await axios.post('http://192.168.1.15:8000/api/login', {
        email: email,
        password: password
      });
      console.log('Login record saved:', response.data);
      console.log('User is logged in');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google login successful:', result.user);

      const response = await axios.post('http://192.168.1.15:8000/api/login', {
        email: result.user.email
      });
      console.log('Login record saved:', response.data);
      console.log('User is logged in');
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