import mongoose from 'mongoose';

const gameListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  games: [{
    type: String,
    ref: 'Game' // Assuming your game schema is named 'Game'
  }]
});

const List = mongoose.model('List', gameListSchema);

export default List;
