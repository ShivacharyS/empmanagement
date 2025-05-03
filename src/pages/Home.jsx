import React from 'react';
import { Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome to Employee Management System
      </Typography>
      <Typography>
        Use the sidebar to navigate to different sections of the application.
      </Typography>
    </Box>
  );
};

export default Home;