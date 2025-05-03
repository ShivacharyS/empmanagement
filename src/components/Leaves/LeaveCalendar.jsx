import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { fetchLeaveRequests } from '../../api/leaves';

const LeaveCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadLeaves = async () => {
      try {
        const leaves = await fetchLeaveRequests();
        const formattedEvents = leaves.map(leave => ({
          id: leave.id,
          title: `${leave.employee.username} - ${leave.leave_type}`,
          start: leave.start_date,
          end: leave.end_date,
          color: leave.duration === 'half_day' ? '#FFD700' : '#FF0000',
          extendedProps: {
            status: leave.status,
            reason: leave.reason
          }
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error loading leaves:', error);
      }
    };
    loadLeaves();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={(eventInfo) => {
          return (
            <div>
              <b>{eventInfo.event.title}</b>
              <div>{eventInfo.event.extendedProps.status}</div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default LeaveCalendar;