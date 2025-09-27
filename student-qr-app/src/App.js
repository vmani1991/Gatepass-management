import React from 'react';
import StudentRequest from './components/StudentRequest';
import HodApproval from './components/HodApproval';
import SecurityCheck from './components/SecurityCheck';
import './App.css';

function App() {
  return (
    <div>
      <h1>Gatepass System</h1>
      <StudentRequest />
      <HodApproval />
      <SecurityCheck />
    </div>
  );
}

export default App;
