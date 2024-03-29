import List from "../models/List.js";

// ROUTE 1: list games using GET '/games'

export const createList = async (req, res) => {
  try {
    const { title, description, gameIds } = req.body;

    const newGameList = await List.create({
      title,
      description,
      games: gameIds, // Assign the provided array of game IDs
    });

    res.status(201).json(newGameList);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
