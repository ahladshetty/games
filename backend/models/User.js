import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    uid: {
        type: Number,
        // required: true
      },
    uname:{
        type:String,
        required:true
    },
    // email:{
    //     type:String,
    //     required:true,
    //     unique:true
    // },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    }
});
const User = mongoose.model('User',userSchema)
export default User;

