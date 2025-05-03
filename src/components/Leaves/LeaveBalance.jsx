import React, { useState, useEffect } from 'react';
import { fetchLeaveBalance } from '../../api/leaves';
import { Box, Typography, Paper, Grid } from '@mui/material';

const LeaveBalance = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBalance = async () => {
      try {
        const data = await fetchLeaveBalance();
        setBalance(data);
      } catch (error) {
        console.error('Error loading leave balance:', error);
      } finally {
        setLoading(false);
      }
    };
    loadBalance();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (!balance) return <Typography>Error loading leave balance</Typography>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Casual Leave</Typography>
            <Typography variant="h4">{balance.casual_leave}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Earned Leave</Typography>
            <Typography variant="h4">{balance.earned_leave}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Sick Leave</Typography>
            <Typography variant="h4">{balance.sick_leave}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Carry Forward</Typography>
            <Typography variant="h4">{balance.carry_forward}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeaveBalance;