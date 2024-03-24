import "./App.css";
import Cardinfo from "./components/Cardinfo";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="card-info" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/back23.png)` }}>


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cardinfo/:id" element={<Cardinfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
