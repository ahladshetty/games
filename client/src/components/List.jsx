import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Navbar from './Navbar';
import "./css/list.css"

const List = () => {
  // State variable to store lists
  const [lists, setLists] = useState([]);

  // Fetch lists from the backend when component mounts
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await fetch('http://localhost:5005/lists');
        const data = await response.json();
        setLists(data);
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    };

    fetchLists();
  }, []);

  return (
    <>
    <Navbar />
    <div className="list-container">
      <h2>All Lists</h2>
      <div className="card-container">
        {lists.map(list => (
          <div key={list._id} className="card">
<h3 className='d-flex justify-content-between'>{list.title}</h3>
            <p>{list.description}</p>
            <p><h3><span className="badge bg-secondary">{list.games.length} games</span></h3></p>


            {/* Add Link to navigate to ListDetails component */}
            <Link to={`/listinfo/${list._id}`} className="btn btn-success">View Details</Link>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default List;
