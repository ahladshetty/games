import Wishlist from '../models/Wishlist.js';

// ROUTE 1: add game to the wishlist using POST '/wishlist/add'
export const addToWishlist = async (req, res) => {
  try {
      const{ userId } = req.user;
      const { gameId } = req.params;

    // Find the user's wishlist or create a new one if it doesn't exist
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({ userId, games: [] });
    }

    if (wishlist.games.includes(gameId)) {
      return res.status(400).json({ error: 'Game already exists in wishlist' });
    }

    wishlist.games.push(gameId); // add game
    await wishlist.save();

    res.status(200).json({ message: 'Game added to wishlist successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ROUTE 2: remove game from the wishlist using DELETE '/wishlist/remove'
export const removeFromWishlist = async (req, res) => {
  try {
    const { userId } = req.user;
    const { gameId } = req.params;

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    // Check if the game exists in the wishlist
    const gameIndex = wishlist.games.indexOf(gameId);
    if (gameIndex === -1) {
      return res.status(404).json({ error: 'Game not found in wishlist' });
    }
    
    wishlist.games.splice(gameIndex, 1); // remove game
    await wishlist.save();

    res.status(200).json({ message: 'Game removed from wishlist successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ROUTE 3: get users wishlist using GET '/wishlist/show/:userId'
export const getUserWishlist = async (req, res) => {
  try {
    const { userId } = req.user;

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist empty' });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ROUTE 4: get recommendtions from wishlist using GET '/wishlist/recommendations'
import { findRecommendations } from './recomController.js';

export const getRecommendationsFromWishlist = async (req, res) => {
  try {
    // Retrieve the current user's wishlist
    const { userId } = req.user;
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist || !wishlist.games.length) {
      return res.status(400).json({ message: 'Wishlist is empty' });
    }

    // Extract game IDs from the wishlist
    const gameIds = wishlist.games;

    // Call findRecommendations function with wishlist game IDs as request body
    const recommendations = await findRecommendations({ body: { gameIds } }, res);

    // Return the recommendations generated from the wishlist
    res.json(recommendations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


