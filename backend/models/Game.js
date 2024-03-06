import mongoose from "mongoose";

// Define the schema for the game collection
const gameSchema = new mongoose.Schema({
  id: {
    type: Number,
    // required: true
  },
  name: {
    type: String,
    // required: true
  },
  playtime: {
    type: Number,
    default: 0 // Provide a default value if necessary
  },
  platforms: {
    type: [String], // Array of strings
    // required: true
  },
  released: {
    type: Date,
    // required: true
  },
  background_image: {
    type: String,
    // required: true
  },
  rating: {
    type: Number,
    default: 0 // Provide a default value if necessary
  },
  metacritic: {
    type: Number,
    default: 0 // Provide a default value if necessary
  },
  short_screenshots: {
    type: [String], // Array of strings (URLs)
    // required: true
  },
  genres: {
    type: [String], // Array of strings
    // required: true
  },
  developers: {
    type: [String], // Array of strings
    // required: true
  }
});

// Create a model based on the schema
const Game = mongoose.model('Game', gameSchema);

// Export the model to be used in other parts of the application
export default Game;
