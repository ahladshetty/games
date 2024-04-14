import Game from "../models/Game.js";

// ROUTE 1: find similar games using POST '/similiargames/:gameId'
export const findSimilarGames = async (req, res) => {
    try {
  
      const { gameId } = req.params;
  
      const selectedGame = await Game.findById(gameId);
      console.log("Game:",selectedGame.name,selectedGame._id);
      console.log();
  
      // Criteria for similarity based on the selected game
      const criteria = {
        genres: selectedGame.genres,
        released: selectedGame.released,
        rating: { $gte: 4 }, // Minimum rating threshold
        metacritic: { $gte: 74 }
      };
  
      // Find similar games in the database
      const similarGames = await Game.find({
        genres: { $in: criteria.genres },
        released: {
          $gte: new Date(criteria.released.getFullYear() - 4, criteria.released.getMonth(), criteria.released.getDate()),
          $lte: new Date(criteria.released.getFullYear() + 4, criteria.released.getMonth(), criteria.released.getDate())
        },
        rating: { $gte: criteria.rating.$gte },
        metacritic: { $gte: criteria.metacritic.$gte }
      }).limit(100); // Limiting the number of results to 10
  
      const randomGames = shuffle(similarGames).slice(0, 8); // function below
  
      console.log(randomGames.map(game => game.name).join('\n'));
      res.json(randomGames);

      } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
      }
      };

// ROUTE 2: find recommendations for a list of game IDs using POST '/recomgames'
export const findRecommendations = async (req, res) => {
  try {
    const { gameIds } = req.body;

    if (!gameIds || !Array.isArray(gameIds) || gameIds.length === 0) {
      return res.status(400).json({ message: 'Invalid game IDs provided' });
    }

    let allRecommendations = [];

    // Loop through each game ID and find recommendations
    for (const gameId of gameIds) {

        const selectedGame = await Game.findById(gameId);

      // Criteria for similarity based on the selected game
      const criteria = {
        genres: selectedGame.genres,
        released: selectedGame.released,
        rating: { $gte: 3.7 }, // Minimum rating threshold
        metacritic: { $gte: 74 }
      };

      // Find similar games in the database
      const similarGames = await Game.find({
        genres: { $in: criteria.genres },
        released: {
          $gte: new Date(criteria.released.getFullYear() - 5, criteria.released.getMonth(), criteria.released.getDate()),
          $lte: new Date(criteria.released.getFullYear() + 5, criteria.released.getMonth(), criteria.released.getDate())
        },
        rating: { $gte: criteria.rating.$gte },
        metacritic: { $gte: criteria.metacritic.$gte }
      }).limit(100); // Limiting the number of results to 100

      // Add the recommendations for this game to the list
      allRecommendations = [...allRecommendations, ...similarGames];
    }

    // Remove duplicates
    const uniqueRecommendations = Array.from(new Set(allRecommendations.map(game => game._id.toString())))
      .map(gameId => allRecommendations.find(game => game._id.toString() === gameId));

    const shuffledRecommendations = shuffle(uniqueRecommendations); // function below

    const finalRecommendations = shuffledRecommendations.slice(0, 8);

    res.json(finalRecommendations);
    console.log(finalRecommendations.map(game => game.name).join('\n'));

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fisher-Yates shuffle algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
    }
    // can also import shuffle from 'lodash/shuffle';
