import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.SECRET

// ROUTE 1: Create a User using: POST '/adduser'
export const addUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ uname: req.body.uname }); // check if user exists
    if (user) {
      console.log("User already exists");
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10); // generate salt
    const secPass = await bcrypt.hash(req.body.password, salt); // generate hash

    let userData = {
      uname: req.body.uname,
      password: secPass,
    };

    const newUser=await User.create(userData);

    const authtoken = jwt.sign({userId:newUser._id,userName:newUser.uname}, JWT_SECRET);
    res.json({ userData, authtoken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Some error occurred');
  }
};

// ROUTE 2: Authenticate a User using: POST '/loginuser'
export const loginUser = async (req, res, next) => {
  let success = false;
  const { uname, password } = req.body;
  try {
    let user = await User.findOne({ uname: uname }); // search for user by username
    if (!user) {
      // console.log(uname);
      return res.status(400).send('Invalid credentials');
    }

    const passwdCompare = await bcrypt.compare(password, user.password); // compare passwords
    if (!passwdCompare) {
      success = false;
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = { // create payload if credentials are correct
      user: {
        uid: user._id,
        uname: user.uname,
        role: user.role
      }
    };

    const authtoken = jwt.sign({userId:user._id,userName:user.uname}, JWT_SECRET);
    success = true;
    res.json({ data, success, authtoken }); // display details in response

  } catch (err) {
    return res.status(500).send('Internal server error');
  }
};
