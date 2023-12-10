import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { usernameOrEmail, password } = formData;
    let formErrors = {};

    if (!usernameOrEmail.trim()) {
      formErrors.usernameOrEmail = 'Username or Email is required';
    }

    if (!password.trim()) {
      formErrors.password = 'Password is required';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
        try {
          const response = await axios.post('http://localhost:3000/login', {
            usernameOrEmail,
            password,
          });

          alert(response.data);
  
          setFormData({
            usernameOrEmail: '',
            password: '',
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
            label="Username or Email"
            variant="outlined"
            name="usernameOrEmail"
            value={formData.usernameOrEmail}
            onChange={handleInputChange}
            error={!!errors.usernameOrEmail}
            helperText={errors.usernameOrEmail}
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
          <Button type="submit" variant="contained" color="primary">
            Login
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

export default LoginForm;
