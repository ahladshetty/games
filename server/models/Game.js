import mongoose from "mongoose";

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
    default: 0 
  },
  platforms: {
    type: [String],
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
    default: 0
  },
  metacritic: {
    type: Number,
    default: 0
  },
  short_screenshots: {
    type: [String],
    // required: true
  },
  genres: {
    type: [String],
    // required: true
  },
  developers: {
    type: [String],
    // required: true
  }
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
