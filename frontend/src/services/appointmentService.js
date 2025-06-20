// services/appointmentService.js - Appointment management services
import api from './api';

export const appointmentService = {
  // Staff/Admin: Create new appointment for donation process
  createAppointment: async (appointmentData) => {
    const response = await api.post('/api/appointments', appointmentData);
    return response.data;
  }
};

export default appointmentService;
