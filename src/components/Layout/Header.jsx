import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';

const Header = ({ user }) => {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Employee Management System
      </Typography>
      {user && (
        <>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            Welcome, {user.username} ({user.role})
          </Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </>
      )}
    </>
  );
};

export default Header;