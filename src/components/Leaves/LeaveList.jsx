import React, { useState, useEffect } from 'react';
import { fetchLeaveRequests, updateLeaveRequest, deleteLeaveRequest } from '../../api/leaves';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip } from '@mui/material';
import { Cancel, CheckCircle, Delete } from '@mui/icons-material';

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaves = async () => {
      try {
        const data = await fetchLeaveRequests();
        setLeaves(data);
      } catch (error) {
        console.error('Error loading leaves:', error);
      } finally {
        setLoading(false);
      }
    };
    loadLeaves();
  }, []);

  const handleCancel = async (id) => {
    try {
      await updateLeaveRequest(id, { status: 'cancelled' });
      setLeaves(leaves.map(leave => 
        leave.id === id ? { ...leave, status: 'cancelled' } : leave
      ));
    } catch (error) {
      console.error('Error cancelling leave:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLeaveRequest(id);
      setLeaves(leaves.filter(leave => leave.id !== id));
    } catch (error) {
      console.error('Error deleting leave:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'pending': return 'warning';
      case 'cancelled': return 'default';
      default: return 'info';
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Leave Type</TableCell>
            <TableCell>Dates</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaves.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell>{leave.leave_type}</TableCell>
              <TableCell>
                {new Date(leave.start_date).toLocaleDateString()} - {' '}
                {new Date(leave.end_date).toLocaleDateString()}
              </TableCell>
              <TableCell>{leave.duration}</TableCell>
              <TableCell>{leave.reason}</TableCell>
              <TableCell>
                <Chip 
                  label={leave.status} 
                  color={getStatusColor(leave.status)} 
                  size="small"
                />
              </TableCell>
              <TableCell>
                {leave.status === 'pending' && (
                  <Button
                    startIcon={<Cancel />}
                    onClick={() => handleCancel(leave.id)}
                    size="small"
                  >
                    Cancel
                  </Button>
                )}
                {leave.status !== 'approved' && (
                  <Button
                    startIcon={<Delete />}
                    onClick={() => handleDelete(leave.id)}
                    size="small"
                    color="error"
                  >
                    Delete
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaveList;