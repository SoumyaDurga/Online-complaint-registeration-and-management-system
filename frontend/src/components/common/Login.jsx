import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Footer from "./FooterC";
import man from "../../Images/man.jpg"; // Import your background image

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/Login", user);
      alert("Successfully logged in");
      localStorage.setItem("user", JSON.stringify(res.data));
      const isLoggedIn = JSON.parse(localStorage.getItem("user"));
      const { userType } = isLoggedIn;
      switch (userType) {
        case "Admin":
          navigate("/AdminHome");
          break;
        case "Ordinary":
          navigate("/HomePage");
          break;
        case "Agent":
          navigate("/AgentHome");
          break;
        default:
          navigate("/Login");
          break;
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("User doesn't exist or invalid credentials");
      } else {
        alert("An error occurred while logging in");
      }
      navigate("/Login");
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>ComplaintCare </Navbar.Brand>
          <ul className="navbar-nav">
            <li className="nav-item mb-2">
              <Link to={"/"} className={`nav-link text-light `}>
                Home
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to={"/signup"} className={`nav-link text-light `}>
                SignUp
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to={"/login"} className={`nav-link text-light `}>
                Login
              </Link>
            </li>
          </ul>
        </Container>
      </Navbar>
      <section className="vh-50 gradient-custom">
        <Container>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-6">
              <img src={man} alt="Background" className="img-fluid" />
            </div>
            <div className="col-lg-6">
              <div className="card bg-dark text-white">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-3 pb-5">
                    <h2 className="fw-bold mb-3">
                      Login For Registering the Complaint
                    </h2>
                    <p className="text-white-50 mb-5">
                      Please enter your credentials
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline form-white mb-3">
                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          required
                        />
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                      </div>
                      <div className="form-outline form-white mb-3">
                        <input
                          type="password"
                          name="password"
                          value={user.password}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          autoComplete="off"
                          required
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>
                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Login
                      </button>
                    </form>
                  </div>
                  <div>
                    <p className="mb-0">
                      Don't have an account? <Link to="/SignUp">SignUp</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default Login;
