import Review from "../models/Review.js";
import User from "../models/User.js";

// ROUTE 1: add reviews using POST '/addReview/:gameId'
export const addReview=async(req,res)=>{
  try {
      const {description, rating   }=req.body;
      const{userId, userName} =req.user
      const {gameId} = req.params
 
      if(!description|| !rating || !userId || !userName || !gameId){
          return res.status(400).json({
              msg:"matha values padle"
          })
      }
  console.log(description);
      const user= await User.findById({_id:userId})
  
      if(!user){
          return res.status(400).json({
              err:"user does not exist"
          })
      }
  
      const reviewAl =  await Review.findOne({userId,gameId})
  
      if(reviewAl){
          return res.status(400).json({msg:"re review? kalve"})
      }
  
      await Review.create({
          gameId,
          userId,
          uname:userName,
          description,
          rating
      })


      res.status(201).json({
        msg:"game created successfully "
      })
  } catch (error) {
    console.log(error);
    res.status(500).json({
        msg:"Something went wrong"
    })
  }
}

// ROUTE 2: delete reviews using DELETE '/deleteReview/:reviewId'
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { userId } = req.user;

    if (!reviewId || !userId) {
      return res.status(400).json({ msg: "Missing required parameters" });
    }

    // Check if the review exists
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }

    // Check if the user is authorized to delete the review
    if (review.userId.toString() !== userId) {
      return res.status(403).json({ msg: "Unauthorized to delete this review" });
    }

    // Delete the review
    await review.remove();

    res.status(200).json({ msg: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};
