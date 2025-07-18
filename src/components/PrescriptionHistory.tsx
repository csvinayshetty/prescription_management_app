// src/components/PrescriptionHistory.tsx
import { useEffect, useState } from 'react';
import { getPrescriptions } from '../service/api';
import type { Prescription } from '../types/types';

export const PrescriptionHistory = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    getPrescriptions().then(setPrescriptions);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Prescription History</h2>
      <ul className="space-y-2">
        {prescriptions.map(p => (
          <li key={p.id} className="border p-2 rounded">
            <strong>{p.drugName}</strong>: {p.dosage} – {p.datePrescribed}
          </li>
        ))}
      </ul>
    </div>
  );
};