// src/api.ts
import axios from 'axios';
import type { Patient, Prescription } from '../types/types';

const API_BASE = 'https://localhost:7046/api';

 export const getPatients = async (): Promise<Patient[]> => {
  const res = await axios.get(`${API_BASE}/Patients`);
   return res.data;
 };

export const getPrescriptions = async (): Promise<Prescription[]> => {
  const res = await axios.get(`${API_BASE}/prescriptions`);
  return res.data;
};

export const createPrescription = async (data: Omit<Prescription, 'id' | 'patientName'>) => {
  const res = await axios.post(`${API_BASE}/prescriptions`, data);
  return res.data;
};
