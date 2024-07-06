// src/pages/Register.js
import React from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import AuthForm from '../components/AuthForm';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';

const Register = () => {
  const handleRegister = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get('first_name');
    const lastName = data.get('last_name');
    const mobileNumber = data.get('mobile_number');
    const userName = data.get('user_name');
    const email = data.get('email');
    const password = data.get('password');
    const avatarColor = data.get('avatarColor') || '#ff5722';
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

    try {
      const response = await axios.post('http://192.168.1.15:8000/api/register', {
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
      console.log('User is registered and logged in');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google login successful:', result.user);
      
      const user = result.user;
      const firstName = user.displayName.split(' ')[0];
      const lastName = user.displayName.split(' ')[1];
      const email = user.email;
      const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

      const response = await axios.post('http://192.168.1.15:8000/api/register', {
        first_name: firstName,
        last_name: lastName,
        mobile_number: '',
        user_name: user.displayName,
        email: email,
        password: '',
        avatar_color: '',
        initials: initials
      });
      console.log('Registration record saved:', response.data);
      console.log('User is registered and logged in');
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