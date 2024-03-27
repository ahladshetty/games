import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: String,
        // required: true
      },
    uname:{
        type:String,
    },
    descripton:{
        type:String
    },
    rating:{
        type:Number
    },
    gameId:{
        type:String
    }
  
});
const Review = mongoose.model('Review',ReviewSchema)
export default Review;

