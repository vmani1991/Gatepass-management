import React, { useState } from 'react';
import axios from 'axios';

function StudentRequest() {
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/requests', {
        studentName: name,
        reason
      });
      setMessage(`Request submitted! Code: ${res.data.code}`);
      setName('');
      setReason('');
    } catch (err) {
      console.error(err);
      setMessage('Error submitting request');
    }
  };

  return (
    <div>
      <h2>Student Request</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Reason"
          value={reason}
          onChange={e => setReason(e.target.value)}
          required
        />
        <button type="submit">Submit Request</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default StudentRequest;

