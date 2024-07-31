import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Navbar from './Navbar';
import hbg from '../../src/images/homebg2.svg'

const List = () => {
  // State variable to store lists
  const [lists, setLists] = useState([]);

  // Fetch lists from the backend when component mounts
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await fetch('http://localhost:5005/lists/show');
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
    <div className="bg-black bg-opacity-50 bg-cover bg-center min-h-screen flex flex-col justify-center items-start"  style={{
      backgroundImage: `url(${hbg})`}}>
      <div className='flex justify-center items-center font-body3 text-white'>
      <Link to="/createlist" className="btn btn-success rounded-2xl hover:scale-110 transition duration-150 ease-in-out" style={{ position: 'absolute', top: '90px', right: '20px' }}>Create List</Link>
      </div>
    <div className="absolute font-body3 text-white text-3xl h-screen">
      <h2 className='p-8'>All Lists</h2>
      </div>
      <div className="card-container pl-8 h-auto pt-24 font-body3 w-auto drop-shadow-[0px_4px_5px_rgba(0,0,0,0.4)] flex flex-wrap" style={{ position: 'absolute', top: '60px', left: '0px' }}>
        {lists.map(list => (
          <div key={list._id} className="card p-8 mr-6">
            <h3 className='d-flex justify-content-between pb-0'>{list.title}</h3>
            <p>{list.description}</p>
            <p><h3><span className="badge bg-secondary p-2 mb-2">{list.games.length} games</span></h3></p>
            {/* Add Link to navigate to ListDetails component */}
            <Link to={`/listinfo/${list._id}`} className="btn btn-success p-3 transform hover:scale-110 transition duration-150 ease-in-out">View Details</Link>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default List;
