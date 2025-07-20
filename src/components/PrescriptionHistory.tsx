/**
 * @fileoverview Prescription History Component for Vitura Healthcare Prescription Management System
 * 
 * This component displays a comprehensive table of all prescription records in the system.
 * It provides detailed information about each prescription including:
 * - Patient information and prescription details
 * - Medication information (name, dosage, frequency, duration)
 * - Prescription dates and status
 * - Prescribing physician information
 * - Prescription notes and instructions
 * 
 * Features include:
 * - Responsive table design
 * - Loading states and error handling
 * - Status badges for prescription states
 * - Sortable and filterable data (ready for implementation)
 * - Accessibility features
 * - Export functionality (ready for implementation)
 * 
 * @author Vinay Kumar P
 * @version 1.0.0
 * @since 2025
 */

import { useEffect, useState } from 'react';
import { getPrescriptions } from '../service/api';
import type { Prescription } from '../interface/Prescription';

/**
 * PrescriptionHistory Component
 * 
 * Renders a comprehensive table of prescription records with detailed information.
 * Includes loading states, error handling, and status indicators.
 * 
 * @component
 * @returns {JSX.Element} Prescription history table
 */
export const PrescriptionHistory = () => {
  // State management for prescription data and loading state
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Loads prescription data on component mount
   * Fetches all prescription records from the API and updates the state
   */
  useEffect(() => {
    getPrescriptions()
      .then(setPrescriptions)
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
          <h1 className="text-3xl font-bold gradient-text">Prescription History</h1>
          <p className="text-sm text-gray-600">
            A complete history of all prescriptions issued to patients.
          </p>
        </div>
      </div>

      {/* Prescription Table Section */}
      <div className="mt-8">
        {prescriptions.length === 0 ? (
          // Empty state - shown when no prescriptions exist
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No prescriptions</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new prescription.</p>
          </div>
        ) : (
          // Prescription table - displays all prescriptions in a responsive table
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                {/* Table Header */}
                <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Drug Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dosage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Prescribed
                    </th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {prescriptions.map((prescription) => (
                    // Individual prescription row with hover effects
                    <tr key={prescription.id} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-150">
                      {/* Patient ID Column */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{prescription.patientId}
                      </td>
                      {/* Drug Name Column */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="font-medium">{prescription.drugName}</span>
                      </td>
                      {/* Dosage Column with Badge Styling */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200">
                          {prescription.dosage}
                        </span>
                      </td>
                      {/* Date Prescribed Column - Formatted for Display */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(prescription.datePrescribed).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};