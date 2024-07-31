import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../../src/images/frame8.png'
import a1 from '../../src/images/star.svg'
// import Navbar from './Navbar';

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
      const response = await fetch('http://localhost:5005/auth/adduser', {
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
    <div className="h-screen w-full text-white bg-cover bg-center flex flex-col justify-center items-center" style={{
      backgroundImage: `url(${img})`
      }}>
         <div className="absolute flex justify-center space-x-36 bottom-0">
       <img src={a1} class="h-10 w-auto movele delay4"/>
       <img src={a1} class=" h-10 w-auto movele delay1"/>
       <img src={a1} class=" h-10 w-auto movele delay4"/>
       <img src={a1} class="h-10 w-auto movele delay2"/>
       <img src={a1} class="h-10 w-auto movele delay3"/>
       <img src={a1} class="h-10 w-auto movele delay5"/>
       <img src={a1} class="h-10 w-auto movele delay2"/>
       <img src={a1} class="h-10 w-auto movele delay1"/>
      </div>
    {/* <Navbar /> */}
    <div className="flex justify-center font-body mb-4">
            <h2 className=' text-7xl drop-shadow-[0px_5px_5px_rgba(0,0,0,0.5)]'>Add User</h2>
            </div>
            <form onSubmit={handleSubmit}>
            <div className='flex justify-center font-body3 text-white mb-4'>
              <label>
                <input
                  type="text"
                  name="uname"
                  value={credentials.uname}
                  placeholder='Username'
                  onChange={handleChange}
                  required
                  className='text-center text-black font-body3 text-opacity-50 form-input mt-2 block w-72 h-12 border-gray-300 rounded-md'
                />
              </label>
              </div>
              <div className='flex justify-center font-body3 text-white '>
              <label>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  placeholder='Password'
                  onChange={handleChange}
                  required
                  className='text-center text-black font-body3 text-opacity-50 form-input mt-2 block w-72 h-12 border-gray-300 rounded-md'
                />
              </label>
              </div>
              ,<div className='flex justify-center'>
              <button type="submit" className=' bg-orange-500 text-white px-4 py-2 font-body3 rounded-md transform hover:scale-105 hover:bg-opacity-80 transition duration-150 ease-in-out bounce1'>Sign Up</button>
              </div>
            </form>
           
          </div>
  );
};

export default Signup;
