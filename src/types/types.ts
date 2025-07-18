// src/types.ts
export interface Patient {
  id: number;
  fullName: string;
   dateOfBirth: string;
}

export interface Prescription {
  id: number;
  patientId: number;
  drugName: string;
  dosage: string;
  datePrescribed: string;
}