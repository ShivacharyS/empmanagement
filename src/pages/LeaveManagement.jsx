import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import LeaveBalance from '../components/Leaves/LeaveBalance';
import LeaveApplyForm from '../components/Leaves/LeaveApplyForm';
import LeaveList from '../components/Leaves/LeaveList';
import LeaveCalendar from '../components/Leaves/LeaveCalendar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const LeaveManagement = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="leave management tabs">
          <Tab label="My Leaves" />
          <Tab label="Apply Leave" />
          <Tab label="Leave Calendar" />
          <Tab label="Leave Balance" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <LeaveList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LeaveApplyForm />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <LeaveCalendar />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <LeaveBalance />
      </TabPanel>
    </Box>
  );
};

export default LeaveManagement;