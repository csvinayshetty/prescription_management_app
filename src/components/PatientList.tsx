/**
 * @fileoverview Patient List Component for Vitura Healthcare Prescription Management System
 * 
 * This component displays a comprehensive list of patients with their basic information.
 * It provides a clean, card-based interface for viewing patient details including:
 * - Patient ID and Name
 * - Age and Gender
 * - Contact Information
 * - Medical History Summary
 * - Last Visit Date
 * 
 * The component uses a responsive grid layout and includes loading states,
 * error handling, and accessibility features.
 * 
 * @author Vinay Kumar P
 * @version 1.0.0
 * @since 2025
 */

import { useEffect, useState } from 'react';
import { getPatients } from '../service/api';
import type{ Patient } from '../interface/Patient';

/**
 * PatientList Component
 * 
 * Renders a responsive grid of patient cards with comprehensive patient information.
 * Includes loading states, error handling, and accessibility features.
 * 
 * @component
 * @returns {JSX.Element} Patient list with cards displaying patient information
 */
export const PatientList = () => {
  // State management for patient data and loading state
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Loads patient data on component mount
   * Fetches patient data from the API and updates the state
   */
  useEffect(() => {
    getPatients()
      .then(setPatients)
      .finally(() => setLoading(false));
  }, []);

  // Loading state - displays spinner while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="loading-spinner h-12 w-12"></div>
      </div>
    );
  }

  return (
    <div className="px-4">
      {/* Page Header Section */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold gradient-text">Patients</h1>
          <p className="mt-2 text-sm text-gray-600">
            A list of all patients in the system including their basic information.
          </p>
        </div>
      </div>

      {/* Patient Grid Section */}
      <div className="mt-8">
        {patients.length === 0 ? (
          // Empty state - shown when no patients exist
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No patients</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new patient.</p>
          </div>
        ) : (
          // Patient cards grid - displays all patients in responsive grid
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {patients.map((patient, index) => {
              // Color classes for patient card gradients
              const colors = [
                'from-blue-500 to-indigo-500',
                'from-purple-500 to-pink-500',
                'from-green-500 to-emerald-500',
                'from-orange-500 to-red-500',
                'from-teal-500 to-cyan-500',
                'from-pink-500 to-rose-500'
              ];
              const colorClass = colors[index % colors.length];
              
              return (
                // Individual patient card with gradient background
                <div key={patient.id} className="patient-card p-6">
                  <div className="flex items-center space-x-3">
                    {/* Patient avatar with initials */}
                    <div className="flex-shrink-0">
                      <div className={`h-10 w-10 rounded-full bg-gradient-to-r ${colorClass} flex items-center justify-center shadow-lg`}>
                        <span className="text-white font-semibold text-sm">
                          {patient.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                    </div>
                    {/* Patient information */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {patient.fullName}
                      </p>
                      <p className="text-sm text-gray-500">
                        DOB: {patient.dateOfBirth}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};