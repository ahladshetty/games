import Review from "../models/Review.js";
import User from "../models/User.js";

export const addReview=async(req,res)=>{
  try {
      const {description, rating   }=req.body;
      const{userId, uname} =req.user
      const {gameId} = req.params
  
      if(!description|| !rating || !userId || !uname || !gameId){
          return res.status(400).json({
              msg:"matha values padle"
          })
      }
  
      const user= await User.findById({id})
  
      if(!user){
          return res.status(400).json({
              err:"user no"
          })
      }
  
      const reviewAl =  await Review.findOne({userId,gameId})
  
      if(reviewAl){
          return res.status(400).json({msg:"err"})
      }
  
      await Review.create({
          gameId,
          userId,
          uname,
          description,
          rating
      })


      res.status(201).json({
        msg:"game created successfully "
      })
  } catch (error) {
    res.status(500).json({
        msg:"Something went wrong"
    })
  }
}