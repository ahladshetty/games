import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: {
        type: String,
        // required: true
      },
    uname:{
        type:String,
    },
    description:{
        type:String
    },
    rating:{
        type:Number
    },
    gameId:{
        type:String
    }
  
});
const Review = mongoose.model('Review',reviewSchema)
export default Review;

