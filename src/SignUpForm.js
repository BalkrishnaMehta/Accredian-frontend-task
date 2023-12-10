import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;
    let formErrors = {};

    const usernameRegex = /^[a-zA-Z0-9_]{6,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!username.trim()) {
      formErrors.username = 'Username is required';
    } else if (!usernameRegex.test(username)) {
      formErrors.username = 'Username must be at least 6 characters';
    }

    if (!email.trim()) {
      formErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      formErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      formErrors.password = 'Password is required';
    } else if (!passwordRegex.test(password)) {
      formErrors.password =
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!confirmPassword.trim()) {
      formErrors.confirmPassword = 'Please confirm password';
    } else if (password !== confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
        try {
          const response = await axios.post('http://localhost:3000/register', {
            username,
            email,
            password,
            cpassword: confirmPassword,
          });
  
          alert(response.data);
  
          setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
          setErrors({});
        } catch (error) {
          if (error.response) {
            setErrors({ ...errors, serverError: error.response.data });
          } else {
            console.error('An error occurred:', error.message);
          }
        }
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            label="Username"
            variant="outlined"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            error={!!errors.username}
            helperText={errors.username}
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            type="password"
            label="Confirm Password"
            variant="outlined"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            fullWidth
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </Grid>
      </Grid>
      {errors.serverError && (
        <Typography variant="body2" color="error">
          {errors.serverError}
        </Typography>
      )}
    </form>
  );
};

export default SignUpForm;
