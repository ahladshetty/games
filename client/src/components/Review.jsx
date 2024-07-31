import React, { useState, useEffect } from 'react';

const Review = ({ gameId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5005/reviews/showreviews/${gameId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data.reviews);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReviews();

    // Cleanup function
    return () => {
      setReviews([]);
      setError(null);
      setLoading(true);
    };
  }, [gameId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {reviews.length === 0 ? (
        <p className=' bg-white bg-opacity-50 mb-9 p-4 rounded-2xl font-body3 text-white space-x-5'>No reviews available for this game.</p>
      ) : (
        <ul>
          {reviews.map((review, index) => (
            <li key={index} className=' bg-white bg-opacity-50 mb-9 p-4 rounded-2xl font-body3 text-white space-x-5'>
              <p>{review.description}</p>
              <p>Rating: {review.rating}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Review;
