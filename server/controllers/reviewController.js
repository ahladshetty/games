import Review from "../models/Review.js";
import User from "../models/User.js";

// ROUTE 1: add reviews using POST '/addReview/:gameId'
export const addReview=async(req,res)=>{
  try {
      const { description, rating } = req.body;
      const { userId, userName } = req.user;
      const { gameId } = req.params;
 
      if(!description|| !rating || !userId || !userName || !gameId){
          return res.status(400).json({
              msg:"matha values padle"
          })
      }
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
        msg:"review added successfully "
      })
  } catch (error) {
    console.log(error);
    res.status(500).json({
        msg:"Something went wrong"
    })
  }
}

// ROUTE 2: show all reviews using GET '/showreviews/:gameId'
export const showReviews = async (req, res) => {
  try {
    const { gameId } = req.params;

    const reviews = await Review.find({ gameId });

    res.status(200).json({
      reviews
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong"
    });
  }
};

// ROUTE 3: delete review by ID using DELETE '/deletereview/:reviewId'
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const deleteReview = await Review.findByIdAndDelete(reviewId);

    if (!deleteReview) {
      return res.status(404).json({ msg: "Review not found" });
    }

    res.status(200).json({
      msg: "Review deleted successfully",
      deleteReview
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong"
    });
  }
};

