// export type EmergencyInfo = {
//   emergencyId: string;
//   userName: string;
//   userPhone: string;
//   userAge: number;
//   userAddress: string;
//   userWeight: double;
//   userHeight: double;
//   emergencyTime: Date;
//   strokeLevel?: string;
//   emergencyLocation: {latitude: double; longitude: double};
// };

export type EmergencyPatient = {
	firstName: string;
	lastName: string;
	age: number;
	address?: string;
	weight: number;
	height: number;
	phoneNumber: string;
  conditions?: string[];
};

export type EmergencyInfo = {
	emergencyId: string;
	patient: EmergencyPatient;
	startDate: Date;
	nihScale?: number;
	// emergencyLocation: {latitude: double; longitude: double};
};

type SingleEmergency = {
  emergencyId: string;
  startDate: string;
  pickupDate: string;
  deliveredDate: string;
  nihScale: number;
  status: string;
  patient: {
    age: number;
    firstName: string;
    height: number;
    lastName: string;
    phoneNumber: string;
    weight: number;
  };
};

export type Emergency = {
  emergencyId: string;
  activatedBy: {
    rol: string;
    phoneNumber: string;
    userId: string;
  };
  startDate: string;
  pickupDate: string;
  deliveredDate: string;
  patientId: string;
  ambulanceId: string;
  nihScale: null | number; // Si nihScale puede ser un número en el futuro
  status: string;
  createdAt: string;
  updatedAt: string;
  healthcenterId: string;
};

export type UserUpdateData = {
  userId: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  role: string;
};

export type Ambulance = {
  ambulanceId: string;
  status: string;
}