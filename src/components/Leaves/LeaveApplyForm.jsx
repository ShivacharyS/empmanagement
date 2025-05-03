import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box, Typography, Snackbar, Alert } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { applyForLeave } from '../../api/leaves';

const LeaveApplyForm = () => {
  const [formData, setFormData] = useState({
    leave_type: 'casual',
    start_date: null,
    end_date: null,
    duration: 'full_day',
    reason: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyForLeave({
        ...formData,
        start_date: formData.start_date.toISOString().split('T')[0],
        end_date: formData.end_date.toISOString().split('T')[0]
      });
      setSuccess(true);
      setFormData({
        leave_type: 'casual',
        start_date: null,
        end_date: null,
        duration: 'full_day',
        reason: ''
      });
    } catch (error) {
      setError('Failed to apply for leave. Please try again.');
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
    setError('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Apply for Leave
      </Typography>
      
      <TextField
        select
        label="Leave Type"
        name="leave_type"
        value={formData.leave_type}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="casual">Casual Leave</MenuItem>
        <MenuItem value="earned">Earned Leave</MenuItem>
        <MenuItem value="sick">Sick Leave</MenuItem>
        <MenuItem value="carry_forward">Carry Forward Leave</MenuItem>
      </TextField>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Start Date"
          value={formData.start_date}
          onChange={(date) => handleDateChange('start_date', date)}
          renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
        />
        <DatePicker
          label="End Date"
          value={formData.end_date}
          onChange={(date) => handleDateChange('end_date', date)}
          renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
        />
      </LocalizationProvider>

      <TextField
        select
        label="Duration"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="full_day">Full Day</MenuItem>
        <MenuItem value="half_day">Half Day</MenuItem>
      </TextField>

      <TextField
        label="Reason"
        name="reason"
        value={formData.reason}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        required
      />

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>

      <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Leave application submitted successfully!
        </Alert>
      </Snackbar>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LeaveApplyForm;