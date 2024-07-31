import React,{useState} from 'react';

const AddRemove = ({ gameId, isInWishlist }) => {
  const token = localStorage.getItem('token');

  const addToWishlist = async () => {
    try {
      const response = await fetch(`http://localhost:5005/wishlist/add/${gameId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      if (!response.ok) {
        throw new Error('Failed to add game to wishlist');
      }
      // window.alert("Added Sucessfully");
      window.alert('Game added to wishlist!', () => {
        // Refresh the window after the alert is closed
        window.location.reload();
      });
    } catch (error) {
      console.error("Error adding game to wishlist:", error);
    }
  };

  const removeFromWishlist = async () => {
    try {
      const response = await fetch(`http://localhost:5005/wishlist/remove/${gameId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to remove game from wishlist');
      }
      window.alert("Game removed from wishlist");
    } catch (error) {
      console.error("Error removing game from wishlist:", error);
    }
  };

  const handleButtonClick = () => {
    if (isInWishlist) {
      removeFromWishlist();
    } else {
      addToWishlist();
    }

  };

  return (
    <button onClick={handleButtonClick} className='font-body3 text-white mt-5 text-xl bg-orange-500 p-3 rounded-2xl transform hover:scale-105 hover:bg-opacity-80 transition duration-150 ease-in-out bounce1 drop-shadow-[0px_5px_5px_rgba(0,0,0,0.5)]'>
      {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
    </button>
  );
};

export default AddRemove;