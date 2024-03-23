import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';
import './css/signup.css';

const Signup = () => {
  const [credentials, setCredentials] = useState({
    uname: '',
    password: '',
  });

  let navigate = useNavigate("/");

  const handleSubmit = async (e) => {
    console.log("hola");
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5005/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uname: credentials.uname, password: credentials.password }),
      });
      const json = await response.json();

      if (json.error) {
        alert(json.error);
      } else {
        alert('User added successfully');
        navigate('/login'); //redirect to a different page after successful addition
      }
    } catch (error) {
      console.error(error.message);
      alert('An error occurred while adding the user');
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
    {/* <Navbar /> */}
      <div className="full-screen bg-signup">
        <div className="signup-container">
          <div className="signup-form">
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
              <label>
                <input
                  type="text"
                  name="uname"
                  value={credentials.uname}
                  placeholder='Username'
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  placeholder='Password'
                  onChange={handleChange}
                  required
                />
              </label>
              
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
