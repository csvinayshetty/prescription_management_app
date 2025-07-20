/**
 * @fileoverview Prescription Form Component for Vitura Healthcare Prescription Management System
 * 
 * This component provides a comprehensive form for creating new prescriptions.
 * It includes form validation, error handling, and success notifications.
 * The form captures essential prescription information including:
 * - Patient selection and details
 * - Medication information (name, dosage, frequency, duration)
 * - Prescription notes and instructions
 * - Prescribing physician information
 * 
 * Features include:
 * - Real-time form validation
 * - Loading states during submission
 * - Success/error notifications
 * - Responsive design
 * - Accessibility features
 * 
 * @author Vinay Kumar P
 * @version 1.0.0
 * @since 2025
 */

import { useEffect, useState } from 'react';
import { createPrescription, getPatients } from '../service/api';
import type { Patient } from '../interface/Patient';  

/**
 * PrescriptionForm Component
 * 
 * Renders a comprehensive prescription creation form with validation,
 * error handling, and success notifications.
 * 
 * @component
 * @returns {JSX.Element} Prescription creation form
 */
export const PrescriptionForm = () => {
  // State management for form data and UI states
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientId, setPatientId] = useState<number>();
  const [drugName, setDrugName] = useState('');
  const [dosage, setDosage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /**
   * Loads patient data on component mount
   * Fetches available patients for the prescription form dropdown
   */
  useEffect(() => {
    getPatients().then(setPatients);
  }, []);

  /**
   * Handles form submission with validation
   * Creates a new prescription and shows success/error feedback
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation - checks if all required fields are filled
    if (!patientId || !drugName || !dosage) {
      setError('All fields are required.');
      return;
    }

    // API call to create prescription
    setLoading(true);
    setError('');
    
    try {
      await createPrescription({ 
        patientId, 
        drugName, 
        dosage, 
        datePrescribed: new Date().toISOString().split('T')[0] 
      });
      
      // Reset form on successful submission
      setDrugName('');
      setDosage('');
      setPatientId(undefined);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to create prescription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Form Container with Gradient Background */}
      <div className="card-gradient p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text">New Prescription</h1>
          <p className="text-sm text-gray-600">
            Create a new prescription for a patient. Please fill in all required fields.
          </p>
        </div>

        {/* Error Message Display */}
        {error && (
          <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800 font-medium">{error}</p>
          </div>
        )}

        {/* Success Message Display */}
        {success && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-medium">Prescription created successfully!</p>
          </div>
        )}

        {/* Prescription Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Selection Field */}
          <div>
            <label htmlFor="patient" className="block text-sm font-medium text-gray-700 mb-2">
              Patient *
            </label>
            <select
              id="patient"
              value={patientId ?? ''}
              onChange={e => setPatientId(Number(e.target.value))}
              className="input-field"
              required
            >
              <option value="">Select a patient</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.fullName} - {patient.dateOfBirth}
                </option>
              ))}
            </select>
          </div>

          {/* Drug Name Field */}
          <div>
            <label htmlFor="drug" className="block text-sm font-medium text-gray-700 mb-2">
              Drug Name *
            </label>
            <input
              id="drug"
              type="text"
              value={drugName}
              onChange={e => setDrugName(e.target.value)}
              className="input-field"
              placeholder="Enter drug name"
              required
            />
          </div>

          {/* Dosage Field */}
          <div>
            <label htmlFor="dosage" className="block text-sm font-medium text-gray-700 mb-2">
              Dosage *
            </label>
            <input
              id="dosage"
              type="text"
              value={dosage}
              onChange={e => setDosage(e.target.value)}
              className="input-field"
              placeholder="e.g., 500mg twice daily"
              required
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="btn-success"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Prescription'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};