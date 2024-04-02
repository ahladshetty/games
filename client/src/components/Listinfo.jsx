import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Listinfo = ({ match }) => {
  const { id } = useParams();

  const [list, setList] = useState(null);

  // Fetch list details from the backend when component mounts
  useEffect(() => {
    const fetchListDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5005/listinfo/${id}`
        );
        const data = await response.json();
        setList(data);
      } catch (error) {
        console.error("Error fetching list details:", error);
      }
    };

    fetchListDetails();
  }, [id]);

  // If list details are still being fetched, display a loading message
  if (!list) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>List Details</h2>
      <h3>{list.title}</h3>
      <p>{list.description}</p>
      <p>{list.games.join(', ')}</p>

      {/* Render games in the list if needed */}
      {/* Add buttons for actions like updating or deleting the list */}
    </div>
  );
};

export default Listinfo;
