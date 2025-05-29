import {Emergency} from '@/types';

const emergency1: Emergency = {
  emergencyId: "123",
  activatedBy: {
    rol: "patient",
    phoneNumber: "1234567890",
    userId: "user123",
  },
  startDate: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
  pickupDate: new Date(Date.now() - 4 * 60 * 1000).toISOString(), // 4 minutes ago
  deliveredDate: new Date(Date.now() - 3 * 60 * 1000).toISOString(), // 3 minutes ago
  patientId: "user123",
  ambulanceId: "AMB001",
  nihScale: 10,
  status: "PENDING",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  healthcenterId: "HC123",
};

const emergency2: Emergency = {
  emergencyId: "456",
  activatedBy: {
    rol: "patient",
    phoneNumber: "3209876543",
    userId: "user456",
  },
  startDate: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
  pickupDate: new Date(Date.now() - 14 * 60 * 1000).toISOString(), // 14 minutes ago
  deliveredDate: new Date(Date.now() - 13 * 60 * 1000).toISOString(), // 13 minutes ago
  patientId: "user456",
  ambulanceId: "AMB002",
  nihScale: 15,
  status: "CONFIRMED",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  healthcenterId: "HC456",
};

const emergency3: Emergency = {
  emergencyId: "789",
  activatedBy: {
    rol: "patient",
    phoneNumber: "3115554433",
    userId: "user789",
  },
  startDate: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
  pickupDate: new Date(Date.now() - 28 * 60 * 1000).toISOString(), // 28 minutes ago
  deliveredDate: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // 25 minutes ago
  patientId: "user789",
  ambulanceId: "AMB003",
  nihScale: 20,
  status: "DELIVERED",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  healthcenterId: "HC789",
};

const emergenciesList: Emergency[] = [emergency1, emergency2, emergency3];

export {emergency1, emergency2, emergency3, emergenciesList};
