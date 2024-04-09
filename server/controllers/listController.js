import List from "../models/List.js";

// ROUTE 1: create list using GET '/createlist'
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

// ROUTE 2: get all lists using GET '/lists'
export const getLists = async (req, res) => {
  try {
      const lists = await List.find();
      res.status(200).json(lists);
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  }
};

// ROUTE 3: get list by id using GET '/listinfo/:id'
export const getListById = async (req, res) => {
  try {
      const list = await List.findById(req.params.id);
      if (!list) {
          return res.status(404).json({ error: "List not found" });
      }
      res.status(200).json(list);
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  }
};

// ROUTE 4: update list using PATCH '/updatelist/:id'
export const updateList = async (req, res) => {
  try {
      const { id } = req.params;
      const { title, description, gameIds } = req.body;

      const updatedList = await List.findByIdAndUpdate(id, { title, description, games: gameIds }, { new: true });
      
      // { new: true } returns updated list

      if (!updatedList) {
          return res.status(404).json({ error: "List not found" });
      }

      res.status(200).json(updatedList);
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  }
};

// ROUTE 5: delete list using DELETE '/deletelist/:id'
export const deleteList = async (req, res) => {
  try {
      const { id } = req.params;

      const deletedList = await List.findByIdAndDelete(id);

      if (!deletedList) {
          return res.status(404).json({ error: "List not found" });
      }

      res.status(200).json({ message: "List deleted successfully" });
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  }
};