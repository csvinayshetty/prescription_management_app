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
 * Patient Interface
 * 
 * Defines the structure of patient data used throughout the application.
 * Contains essential patient information for healthcare management.
 * 
 * @interface Patient
 * @property {number} id - Unique identifier for the patient
 * @property {string} fullName - Full name of the patient
 * @property {string} dateOfBirth - Patient's date of birth in YYYY-MM-DD format
 */
export interface Patient {
    id: number;
    fullName: string;
    dateOfBirth: string;
  }