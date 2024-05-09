import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from './FooterC';
import manage1 from '../../Images/manage1.jpg'; // Assuming the path is correct

const Home = () => {
   return (
      <>
         <Navbar bg="dark" variant="dark">
            <Container>
               <Navbar.Brand>ComplaintCare </Navbar.Brand>
               <ul className="navbar-nav">
                  <li className="nav-item mb-2">
                     <Link to={'/'} className={`nav-link text-light `}>
                        Home
                     </Link>
                  </li>
                  <li className="nav-item mb-2">
                     <Link to={'/signup'} className={`nav-link text-light `}>
                        SignUp
                     </Link>
                  </li>
                  <li className="nav-item mb-2">
                     <Link to={'/login'} className={`nav-link text-light `}>
                        Login
                     </Link>
                  </li>
               </ul>
            </Container>
         </Navbar>
         <div className="home-container">
            <div className="left-side">
               <p>
                  <span className='f-letter'>Empower Your Team,</span><br />
                  <span className='s-letter'> Exceed Customer Expectations: Discover our</span> <br />
                  <span className='t-letter'>Complaint Management Solution</span><br />
                  <Link to={'/Login'}><Button className='mt-3 register'>Register your Complaint</Button></Link>
               </p>
            </div>
         </div>
         <div class="container">
            <div class="row">
               <h2>Our Advantages</h2>
               <div class="col-md-6">
                  <div class="box">
                     <h3>Time Saving</h3>
                     <p>Filing online consumer complaint will save your time</p>
                  </div>
               </div>
               <div class="col-md-6">
                  <div class="box">
                     <h3>Any Device</h3>
                     <p>The complaint can be filed from mobile/computer</p>
                  </div>
               </div>
               <div class="col-md-6">
                  <div class="box">
                     <h3>Complaint Anywhere</h3>
                     <p>It can be done from any location </p>
                  </div>
               </div>
               <div class="col-md-6">
                  <div class="box">
                     <h3>Expert Advice</h3>
                     <p>You will receive assistance from Consumer Complaint experts</p>
                  </div>
               </div>
            </div>
         </div>
         <img src={manage1} alt="Advantages" style={{ width: '80%', height:'400px',display: 'block', margin: '10px auto' }} /> 
         <Footer />
      </>
   );
}

export default Home;
