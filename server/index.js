import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import connectToDatabase from './DB/db.js';

import userRouter from './routes/userRoutes.js';
import gameRouter from './routes/gameRoutes.js';
import reviewRouter from './routes/reviewRoutes.js'
import listRouter from './routes/listRoutes.js'
import wishlistRouter from './routes/wishlistRoutes.js'
import recomRouter from "./routes/recomRoutes.js";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(gameRouter);
app.use(reviewRouter);
app.use(listRouter);
app.use(wishlistRouter);
app.use(recomRouter);

// Set up database connection
connectToDatabase()
  .then(() => {
    
  })
  .catch((error) => {
    console.error('Error setting up database connection:', error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
