import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Button } from 'react-bootstrap';
import ChatWindow from '../common/ChatWindow';
import Collapse from 'react-bootstrap/Collapse';

const Status = () => {
  const [toggle, setToggle] = useState({});
  const [statusComplaints, setStatusComplaints] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { _id } = user;
    axios
      .get(`http://localhost:8000/status/${_id}`)
      .then((res) => {
        setStatusComplaints(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleToggle = (complaintId) => {
    setToggle((prevState) => ({
      ...prevState,
      [complaintId]: !prevState[complaintId],
    }));
  };
  const calculateProgress = (status, assignedStatus) => {
    // Initialize progress variables
    let registeredProgress = 0;
    let agentMetProgress = 0;
    // Check status from complaint schema
    if (status === 'pending') {
      registeredProgress = 33; 
    } else if (status === 'completed') {
      agentMetProgress = 100; 
    }
    // Calculate total progress
    const totalProgress = registeredProgress + agentMetProgress;
  
    return totalProgress;
  };
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px' }}>
        {statusComplaints.length > 0 ? (
          statusComplaints.map((complaint, index) => {
            const open = toggle[complaint._id] || false;
            const progress = calculateProgress(complaint.status);
            return (
              <Card key={index} style={{ width: '18.5rem', margin: '0 15px 15px 0' }}>
                <Card.Body>
                  <Card.Title>Name: {complaint.name}</Card.Title>
                  <Card.Text>Address: {complaint.address}</Card.Text>
                  <Card.Text>City: {complaint.city}</Card.Text>
                  <Card.Text>State: {complaint.state}</Card.Text>
                  <Card.Text>Pincode: {complaint.pincode}</Card.Text>
                  <Card.Text>Comment: {complaint.comment}</Card.Text>
                  <Card.Text>Status: {complaint.status}</Card.Text>
                  <Button onClick={() => handleToggle(complaint._id)} aria-controls={`collapse-${complaint._id}`} aria-expanded={open} variant="primary">
                    Message
                  </Button>
                  <div style={{ minHeight: '100%' }}>
                    <Collapse in={open} dimension="width">
                      <div id={`collapse-${complaint._id}`}>
                        <Card body style={{ width: '250px', marginTop: '12px' }}>
                          <ChatWindow key={complaint.complaintId} complaintId={complaint._id} name={complaint.name} />
                        </Card>
                      </div>
                    </Collapse>
                    <br/>
                    <ProgressBar now={progress} label={`${progress}%`} />
                  </div>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <Alert variant="info">
            <Alert.Heading>No complaints to show</Alert.Heading>
          </Alert>
        )}
      </div>
    </>
  );
};
export default Status;