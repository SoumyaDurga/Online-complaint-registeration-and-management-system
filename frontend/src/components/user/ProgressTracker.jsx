import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Alert from 'react-bootstrap/Alert';

const ProgressTracker = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:8000/status');
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaint data:', error);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div>
      <h4>Complaint Progress</h4>
      {complaints.length > 0 ? (
        <ProgressBar>
          <ProgressBar variant="info" now={(complaints.filter(complaint => complaint.status === 'registered').length / complaints.length) * 100} key={1} label={`Registered`} />
          <ProgressBar variant="warning" now={(complaints.filter(complaint => complaint.status === 'agentAssigned').length / complaints.length) * 100} key={2} label={`Agent Assigned`} />
          <ProgressBar variant="success" now={(complaints.filter(complaint => complaint.status === 'completed').length / complaints.length) * 100} key={3} label={`Agent Met`} />
        </ProgressBar>
      ) : (
        <Alert variant="info">
          <Alert.Heading>No complaints to show</Alert.Heading>
        </Alert>
      )}
    </div>
  );
};

export default ProgressTracker;
