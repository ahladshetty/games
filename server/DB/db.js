// db.mjs
import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb+srv://ahladshetty03:games123@mini.iaboai2.mongodb.net/?retryWrites=true&w=majority&appName=mini');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectToDatabase;
