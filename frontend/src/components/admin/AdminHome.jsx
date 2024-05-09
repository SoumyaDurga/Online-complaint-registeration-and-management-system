import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import UserInfo from './UserInfo';
import AccordionAdmin from "./AccordionAdmin";
import AgentInfo from './AgentInfo';

const AdminHome = () => {
   const navigate = useNavigate();
   const [activeComponent, setActiveComponent] = useState('dashboard');
   const [userName, setUserName] = useState('');
   const [userCount, setUserCount] = useState(0);
   const [agentCount, setAgentCount] = useState(0);
   const [totalComplaints, setTotalComplaints] = useState(0);

   useEffect(() => {
      const getData = async () => {
         try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
               const { name } = user;
               setUserName(name);

               // Fetch counts for users, agents, and complaints
               const [userResponse, agentResponse, totalComplaintsResponse] = await Promise.all([
                  axios.get('http://localhost:8000/users/count'),
                  axios.get('http://localhost:8000/agents/count'),
                  axios.get('http://localhost:8000/complaints/count')
               ]);

               // Update state with fetched counts
               setUserCount(userResponse.data.count);
               setAgentCount(agentResponse.data.count);
               setTotalComplaints(totalComplaintsResponse.data.count);
            } else {
               navigate('/');
            }
         } catch (error) {
            console.log(error);
         }
      };
      getData();
   }, [navigate]);

   const handleNavLinkClick = (componentName) => {
      setActiveComponent(componentName);
   };

   const LogOut = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   return (
      <>
         <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
               <Navbar.Brand>Hi Admin {userName}</Navbar.Brand>
               <Navbar.Toggle aria-controls="navbar-nav" />
               <Navbar.Collapse id="navbar-nav">
                  <Nav className="me-auto">
                     <NavLink className={`nav-link ${activeComponent === 'dashboard' ? 'active' : ''}`} onClick={() => handleNavLinkClick('dashboard')}>Dashboard</NavLink>
                     <NavLink className={`nav-link ${activeComponent === 'UserInfo' ? 'active' : ''}`} onClick={() => handleNavLinkClick('UserInfo')}>User</NavLink>
                     <NavLink className={`nav-link ${activeComponent === 'Agent' ? 'active' : ''}`} onClick={() => handleNavLinkClick('Agent')}>Agent</NavLink>
                  </Nav>
                  <Button onClick={LogOut} variant="outline-danger">Log out</Button>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <Container className="mt-4">
            <div className="row">
               <div className="col-md-4">
                  <div className="card bg-danger text-white my-2">
                     <div className="card-body">
                        <h5 className="card-title">Total Users</h5>
                        <p className="card-text">{userCount}</p>
                     </div>
                  </div>
               </div>
               <div className="col-md-4">
                  <div className="card bg-warning text-white my-2">
                     <div className="card-body">
                        <h5 className="card-title">Total Agents</h5>
                        <p className="card-text">{agentCount}</p>
                     </div>
                  </div>
               </div>
               <div className="col-md-4">
                  <div className="card bg-success text-white my-2">
                     <div className="card-body">
                        <h5 className="card-title">Total Complaints</h5>
                        <p className="card-text">{totalComplaints}</p>
                     </div>
                  </div>
               </div>
            </div>
         </Container>

         <Container className="mt-4">
            <div className="row">
               <div className="col-md-120">
                  <div className="content">
                     {activeComponent === 'Agent' ? <AgentInfo /> : null}
                     {activeComponent === 'dashboard' ? <AccordionAdmin /> : null}
                     {activeComponent === 'UserInfo' ? <UserInfo /> : null}
                  </div>
               </div>
            </div>
         </Container>
      </>
   );
}

export default AdminHome;