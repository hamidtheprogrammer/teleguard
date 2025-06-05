// appointmentInterfaces.ts

export interface AppointmentPayload {
  id?: String;
  docInfo: {
    id: string;
    name: string;
  };
  patientInfo: {
    id: string;
    name: string;
  };
  status?: "PENDING" | "APPROVED" | "COMPLETED" | "DECLINED"; // default is "PENDING" if not provided
  doctorComment?: string;
  patientComplaint?: string;
  date: Date; // or Date if handling conversion
}

// Interface for Update Payload
export interface UpdateAppointmentPayload {
  id: string;
  status?: "PENDING" | "APPROVED" | "COMPLETED" | "DECLINED";
  doctorComment?: string;
  patientComplaint?: string;
}
