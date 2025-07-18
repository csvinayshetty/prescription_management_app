// src/components/PrescriptionForm.tsx
import { useEffect, useState } from 'react';
import { createPrescription, getPatients } from '../service/api';
import type { Patient } from '../types/types';

export const PrescriptionForm = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientId, setPatientId] = useState<number>();
  const [drugName, setDrugName] = useState('');
  const [dosage, setDosage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getPatients().then(setPatients);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId || !drugName || !dosage) {
      setError('All fields are required.');
      return;
    }
    await createPrescription({ patientId, drugName, dosage });
    setDrugName('');
    setDosage('');
    setPatientId(undefined);
    setError('');
    alert('Prescription submitted!');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md">
      <h2 className="text-xl font-bold mb-2">New Prescription</h2>
      {error && <p className="text-red-500">{error}</p>}
      <label className="block mb-2">
        Patient:
        <select
          value={patientId ?? ''}
          onChange={e => setPatientId(Number(e.target.value))}
          className="block w-full border rounded p-2"
        >
          <option value="">Select patient</option>
          {patients.map(p => (
            <option key={p.id} value={p.id}>
              {p.fullName}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-2">
        Drug:
        <input
          value={drugName}
          onChange={e => setDrugName(e.target.value)}
          className="block w-full border rounded p-2"
        />
      </label>

      <label className="block mb-2">
        Dosage:
        <input
          value={dosage}
          onChange={e => setDosage(e.target.value)}
          className="block w-full border rounded p-2"
        />
      </label>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
        Submit
      </button>
    </form>
  );
};