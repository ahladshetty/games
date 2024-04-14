import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css";

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

  return (
    <>
      <div className="full-screen bg-login">
        <div className="only">
          <h1>GOBBU</h1>
        </div>
        <div class="menubar">
        <ul>
          <li><a href="link">SIGNUP</a></li>
         </ul>
        </div>
        <div className="login-container ">
          <div className="row justify-content-center">
            <div className="login-form">
              <form onSubmit={handleSubmit}>
                <h2>LOGIN</h2>
                <div>
                  <label htmlFor="uname">
                    {/* Username */}
                  </label>
                  <input
                    type="text"
                    value={credentials.uname}
                    onChange={onChange}
                    id="uname"
                    name="uname"
                    placeholder="USERNAME"
                  />
                </div>
                <div>
                  <label htmlFor="password">
                    {/* Password */}
                  </label>
                  <input
                    type="password"
                    value={credentials.password}
                    onChange={onChange}
                    name="password"
                    id="password"
                    placeholder="PASSWORD"
                  />
                </div>
                <div>
                  <button type="submit">
                    SUBMIT
                  </button>
                  {/* <button type="button" onClick={() => { navigate('/stafflogin') }}>
                    STAFF
                  </button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
