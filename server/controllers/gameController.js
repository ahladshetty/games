import Game from "../models/Game.js";

// ROUTE 1: list games using GET '/games'
export const showGames = async (req, res) => {
  try {
    const games = await Game.find();

    if (!games || games.length === 0) {
      return res.status(404).json({ message: "No games found" });
    }

    res.json(games);
  } catch (error) {
    console.error("Error fetching games ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// ROUTE 2: get game details using GET '/gameinfo'
export const gameInfo = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(400).send('Cant get game details');
    }
    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
