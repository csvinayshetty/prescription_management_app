// src/App.tsx
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { PatientList } from './components/PatientList';

import './App.css'
import { PrescriptionForm } from './components/PrescriptionForm';
import { PrescriptionHistory } from './components/PrescriptionHistory';



function App() {
  return (
    <Router>
      <nav className="flex gap-4 p-4 bg-gray-200">
        <Link to="/">Patients</Link>
        <Link to="/new">New Prescription</Link>
        <Link to="/history">History</Link>
      </nav>

      <Routes>
        <Route path="/" element={<PatientList />} />
        <Route path="/new" element={<PrescriptionForm />} />
        <Route path="/history" element={<PrescriptionHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
