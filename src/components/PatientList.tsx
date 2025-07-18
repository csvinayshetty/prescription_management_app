// src/components/PatientList.tsx
import { useEffect, useState } from 'react';
import type { Patient } from '../types/types';
import { getPatients } from '../service/api';

export const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    getPatients().then(setPatients);
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b pb-2">
        Patient List
      </h2>
      <ul className="space-y-3">
        {patients.map((p) => (
          <li
            key={p.id}
            className="flex justify-between items-center p-4 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition duration-200"
          >
            <span className="text-gray-800 font-medium">{p.fullName}</span>
            <span className="text-sm text-gray-600">{p.dateOfBirth}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};