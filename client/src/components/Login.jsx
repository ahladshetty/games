import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from '../../src/images/backnew.png'
import a1 from '../../src/images/ar1.svg'
import a2 from '../../src/images/ar2.svg'
import a3 from '../../src/images/ar3.svg'
import a4 from '../../src/images/ar4.svg'


const Login = () => {
  const [credentials, setCredentials] = useState({ uname: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5005/auth/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uname: credentials.uname,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (json.success) {
      console.log(json);
      localStorage.setItem("token", json.authtoken); //save token
      // localStorage.setItem("user", json.data);
      localStorage.setItem("user", JSON.stringify(json.data));
      alert("welcome " + credentials.uname)
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

<link rel="stylesheet" href="style.css"/>

  return (
<div className="h-screen w-full text-white bg-cover bg-center" style={{
            backgroundImage: `url(${img})`
            }}>
      <div className="absolute flex justify-center space-x-36 bottom-0">
       <img src={a1} alt="" className="h-10 w-auto movele delay4"/>
       <img src={a2} alt="" className=" h-10 w-auto movele delay1"/>
       <img src={a1} alt="" className=" h-10 w-auto movele delay4"/>
       <img src={a4} alt="" className="h-10 w-auto movele delay2"/>
       <img src={a1} alt="" className="h-10 w-auto movele delay3"/>
       <img src={a4} alt="" className="h-10 w-auto movele delay5"/>
       <img src={a3} alt="" className="h-10 w-auto movele delay2"/>
       <img src={a1} alt="" className="h-10 w-auto movele delay1"/>
      </div>
    <div className="flex justify-center font-body text-9xl pt-12 drop-shadow-[0px_5px_5px_rgba(0,0,0,0.5)]">
    <h1 className="bounce">GOBBU</h1>
    </div>
    <div className="absolute right-7 top-3.5 pt-2 font-body3 text-xl text-white transform hover:scale-110 transition duration-150 ease-in-out">
      <Link to="/signup">SIGNUP</Link>
    </div>
    <div className="flex justify-center items-start">
        <div className="rounded h-1/2 w-96 px-8 py-8 drop-shadow-[0_5px_20px_rgba(0,0,0,0.5)]">
            <h2 className="text-6xl font-semibold mb-4 flex justify-center font-body3 pt-0">LOGIN</h2>
            <form  onSubmit={handleSubmit} alt="" className="flex flex-col justify-center items-center">
                <div className="mb-4">
                   <label htmlFor="username" className="text-white text-2xl font-body3 flex justify-center">USERNAME</label>
                   <input type="text" value={credentials.uname} onChange={onChange} id="uname" name="uname" alt="" className="text-center text-black font-body3 text-opacity-50 form-input mt-2 block w-72 h-12 border-gray-300 rounded-md"></input>
                </div>
                <div className="mb-4">
                     <label htmlFor="password" className="text-white text-2xl font-body3 font-medium flex justify-center">PASSWORD</label>
                   <input type="password" value={credentials.password} onChange={onChange} id="password" name="password" alt="" className="text-center font-body3 text-black text-opacity-50 form-input mt-2 block w-72 h-12 border-gray-300 rounded-md"></input>
                 </div>
                 <button type="submit" alt="" className=" bg-orange-500 text-white px-4 py-2 font-body3 rounded-md transform hover:scale-105 hover:bg-opacity-80 transition duration-150 ease-in-out bounce1">SUBMIT</button>
            </form>
        </div>
    </div>
    </div>
  
  );
  }

export default Login;
