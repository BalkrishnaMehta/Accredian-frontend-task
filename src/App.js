import React from 'react';
import { Container, Grid, Paper, Divider, Typography, Box } from '@mui/material';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

const App = () => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f0f0f0"
    >
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: '40px' }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={5}>
              <Typography variant="h5" gutterBottom align="center">
                Login
              </Typography>
              <LoginForm />
            </Grid>
            <Grid item xs={12} sm={1}>
              <Divider orientation="vertical" sx={{ height: '100%' }} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography variant="h5" gutterBottom align="center">
                Sign Up
              </Typography>
              <SignUpForm />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default App;
