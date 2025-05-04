import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/Auth/PrivateRoute';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import LeaveManagement from './pages/LeaveManagement';
import NotFound from './pages/NotFound';
import Dashboard from './components/Layout/Dashboard';  // Fixed import
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Dashboard />}>  {/* Fixed component name */}
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