import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext.jsx';
import PrivateRoute from './components/Auth/PrivateRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Home from './pages/Home.jsx';
import LeaveManagement from './pages/LeaveManagement.jsx';
import NotFound from './pages/NotFound.jsx';
import Layout from './components/Layout/Dashboard.jsx';
import theme from './theme.js';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="leaves" element={<PrivateRoute><LeaveManagement /></PrivateRoute>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;