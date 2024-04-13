import express from 'express';
import userRouter from './routes/userRoutes.js';
import gameRouter from './routes/gameRoutes.js';
import reviewRouter from './routes/reviewRoutes.js'
import listRouter from './routes/listRoutes.js'
import wishlistRouter from './routes/wishlistRoutes.js'
import recomRouter from "./routes/recomRoutes.js";
import connectToDatabase from './DB/db.js';
import cors from 'cors';
import 'dotenv/config'

const app = express();
const port = 5005;

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
    // Once connected to the database, fetch and save game data
    // const apiKey = '5a192e35ebff4264bd1491d980493786'; // the og
    const apiKey = 'bd6d1632f924428eaf2ab385c50b834a'; // coselet985@hidelux.com

    // fetchGameData(apiKey);
  })
  .catch((error) => {
    console.error('Error setting up database connection:', error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
