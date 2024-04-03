import React from "react";
import { useNavigate } from "react-router-dom";

import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const location = useLocation();
  let user = localStorage.getItem('user')
  user = user ? JSON.parse(user) : null

  const handleLogout = ()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/about">
            COOLDOWN
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             
              <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/lists" ? "active" : ""}`} to="/">EXPLORE</Link>              </li>
              
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/lists" ? "active" : ""}`} to="/lists">LISTS</Link>
              </li>
            </ul>
            {user?.user?.role==="staff" && <Link className={`mx-2 nav-link ${location.pathname === "/editmenu" ? "active" : ""}`} to="/editmenu" >EditMenu</Link>}
            {user?.user?.role==="staff" && <Link className={`mx-2 nav-link ${location.pathname === "/signup" ? "active" : ""}`} to="/signup" >Signup</Link>}
            <Link className={`mx-2 nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">ABOUT</Link>
            <button className={`mx-1 nav-link`} onClick={handleLogout} >LOGOUT</button>
            {/* </form> */}
          </div>
        </div>
      </nav>
  );
};

export default Navbar;