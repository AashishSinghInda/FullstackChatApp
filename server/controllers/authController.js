import userModel from "../models/userModel.js"
//const dotenv = require('dotenv');
import jwt from'jsonwebtoken';
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken, refreshAccessTokenService } from "../services/authService.js";




export const register = async (req,res)=>{
   
  try {
    const {name,email,password,currentPassword} = req.body;

    if(!name || !email || !password || !currentPassword){
      return res.status(400).json({message : "All fields are required"})
    }

    const existingUser = await userModel.findOne({email})
     if(existingUser){
      return res.status(400).json({message : "Email already registered!"})
     } 


     const hashedPassword = await bcrypt.hash(password,10);
     const hashedCurrentPassword = await bcrypt.hash(currentPassword,10)

     const newUser = await userModel.create({
      name,    
      email,  
       password : hashedPassword, 
      currentPassword : hashedCurrentPassword 
     })

     res.status(201).json({
       message : "User Registered Successfully!",
       user : {
        userId : newUser._id.toString(),
        name : newUser.name,
        email : newUser.email,
       },
     })   
  }
     catch(error){
        res.status(500).json({message : "Server error",  error : error.message});
     }
}




// User Login logic 

export const login = async (req,res)=>{ 
  try {
    const {email,password} = req.body;


    if(!email || !password){
      return res.status(400).json({message : "Email and Password Required!"})
    }

    const user = await userModel.findOne({email})
    if(!user){
      return res.status(404).json({message : "User not found"})
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
      return res.status(400).json({message : "Invalid email or Password!"})
    }

    
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    

    

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();  

    res.status(200).json({
      message : "Login successfull!",
      user : {
        userId : user._id.toString(),
        name : user.name,
        email : user.email,
        
      },
      accessToken,
      refreshToken,
    })
    }
    catch(error){
      res.status(500).json({message : "Server error", error : error.message})
    }
  }

  // Refresh token controller

  export const refreshTokencontroller = async (req,res)=>{

    const {refreshToken} = req.body;

    if(!refreshToken){
      return res.status(401).json({message : "Refresh token required"})
    }

    try {
      
        //  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
     

      const data = await refreshAccessTokenService(refreshToken,userModel)

      res.status(200).json({
        message : "New access token generated",
        accessToken : data.accessToken,
        refreshToken : data.refreshToken
      })
    }
    catch(error){
      res.status(403).json({message : error.message})
    }
  }





  // Logout Api logic 

  export  const   logout = async (req,res)=>{
    try {
      const {userId} = req.body

      console.log(userId)

      if(!userId){
       return  res.status(400).json({message : "User Id is required!"})
      }

      await userModel.findByIdAndUpdate(userId,{
        refreshToken : null,
        accessToken : null,
      });

        res.status(200).json({message : "Logged out successfully"}) 
    }
    catch(error){
       res.status(500).json({message: "Logout failed", error})
    }
  };
























/* let registerInsert = async (req, res) => {

   let jwtSecretKey = process.env.JWT_SECRET_KEY;

 

 try {
    const { name, email, password } = req.body;

   // console.log("1",req.body)

     // Check if user already exists
    const existingUser = await registerModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password,10) 

    // Create new user
    const newUser = new registerModel({ name, email, password : hashed})


    await newUser.save();

      let data = {
        time: Date(),
        userId: 12,
    }

    

    const token = jwt.sign({id: newUser._id, email: newUser.email},jwtSecretKey);

    console.log(token)

    res.status(201).json({newUser,token, message: "User registered successfully!" });

    
  } 


  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
  };

  export {registerInsert}   */ 