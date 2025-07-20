/**
 * @fileoverview Type Definitions for Vitura Healthcare Prescription Management System
 * 
 * This module contains all TypeScript type definitions and interfaces used throughout
 * the application. It provides type safety and ensures consistency across components.
 * 
 * Types include:
 * - Patient data structure
 * - Prescription data structure
 * - API response types
 * - Form data types
 * 
 * @author Vinay Kumar P
 * @version 1.0.0
 * @since 2025
 */

/**
 * Prescription Interface
 * 
 * Defines the structure of prescription data used throughout the application.
 * Contains medication and prescription details for patient care.
 * 
 * @interface Prescription
 * @property {number} id - Unique identifier for the prescription
 * @property {number} patientId - ID of the patient this prescription belongs to
 * @property {string} drugName - Name of the prescribed medication
 * @property {string} dosage - Dosage instructions for the medication
 * @property {string} datePrescribed - Date when the prescription was issued (YYYY-MM-DD)
 */
export interface Prescription {
    id: number;
    patientId: number;
    drugName: string;
    dosage: string;
    datePrescribed: string;
  }