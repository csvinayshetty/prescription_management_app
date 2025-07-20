/**
 * @fileoverview Main Application Component for Vitura Healthcare Prescription Management System
 * 
 * This is the root component that sets up the application routing and navigation structure.
 * It provides a centralized navigation system with three main sections:
 * - Patient List: View and manage patient information
 * - New Prescription Form: Create new prescriptions
 * - Prescription History: View all prescription records
 * 
 * @author Vinay Kumar P
 * @version 1.0.0
 * @since 2025
 */

import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { PatientList } from './components/PatientList';
import { PrescriptionForm } from './components/PrescriptionForm';
import { PrescriptionHistory } from './components/PrescriptionHistory';

/**
 * Navigation Component
 * 
 * Renders the main navigation bar with the application title and navigation links.
 * Uses React Router's useLocation hook to highlight the active route.
 * 
 * @component
 * @returns {JSX.Element} Navigation bar with title and route links
 */
function Navigation() {
  // Gets current location for active route highlighting
  const location = useLocation();
  
  /**
   * Determines if a given path is currently active
   * @param {string} path - The route path to check
   * @returns {boolean} True if the path matches current location
   */
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="glass-effect">
      <div className="max-w-7xl mx-auto px-4">
        {/* Application Title Section */}
        <div className="flex justify-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold gradient-text italic text-center">
              Vitura Healthcare - Prescription Management System
            </h1>
          </div>
        </div>
        
        {/* Navigation Links Section */}
        <div className="flex justify-center space-x-8 pb-4">
          {/* Patient List Navigation Link */}
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''} px-3 py-2 text-sm font-medium`}
          >
            Patient List
          </Link>
          
          {/* New Prescription Form Navigation Link */}
          <Link 
            to="/new" 
            className={`nav-link ${isActive('/new') ? 'active' : ''} px-3 py-2 text-sm font-medium`}
          >
            New Prescription Form
          </Link>
          
          {/* Prescription History Navigation Link */}
          <Link 
            to="/history" 
            className={`nav-link ${isActive('/history') ? 'active' : ''} px-3 py-2 text-sm font-medium`}
          >
            Prescription History
          </Link>
        </div>
      </div>
    </nav>
  );
}

/**
 * Main Application Component
 * 
 * Sets up the React Router configuration and renders the main application structure.
 * Provides routing for three main application sections with proper component organization.
 * 
 * @component
 * @returns {JSX.Element} The complete application with routing
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen">
        {/* Navigation Header */}
        <Navigation />
        
        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto py-6 px-4">
          <Routes>
            {/* Patient List Route - Default landing page */}
            <Route path="/" element={<PatientList />} />
            
            {/* New Prescription Form Route */}
            <Route path="/new" element={<PrescriptionForm />} />
            
            {/* Prescription History Route */}
            <Route path="/history" element={<PrescriptionHistory />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
