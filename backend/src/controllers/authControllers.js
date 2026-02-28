import { generateToken } from "../config/util.js";
import userModel from "../model/user.model.js"
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
import transporter from "../config/nodeMailer.js";
import { sendEmail } from "../config/nodeMailer.js";


// this function is used to send otp for a new user.
export const sendOtpForRegister = async (req, res) => {
  try {
    const { fullName, email, password, profilePic } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    // store user with OTP (not verified yet)
    const newUser = new userModel({
      email,
      fullName,
      password,
      profilePic: profilePic || "",
      verifyOtp: otp,
      verifyOtpExpireAt: otpExpire,
    });

    await newUser.save();

    // send OTP using Brevo API
    await sendEmail({
      to: email,
      subject: "Email Verification OTP",
      html: `
        <div style="font-family: Arial; padding:20px;">
          <h2>Welcome ${fullName}</h2>
          <p>Your OTP is:</p>
          <h1 style="letter-spacing:3px;">${otp}</h1>
          <p>This OTP is valid for 10 minutes.</p>
        </div>
      `,
    });

    return res.json({
      success: true,
      message: "OTP sent to email. Please verify.",
    });
  } catch (error) {
    console.error("OTP Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send OTP" });
  }
};



//this function is used to verify the otp  recieved by the user to validate.
export const verifyOtpAndRegister = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found, please register again" });
    }

    // check otp
    if (user.verifyOtp !== otp || user.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // finalize user
    user.password = hashedPassword;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    generateToken(user._id,res);
    await user.save();

    return res.json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


//this is login function 
export const login=async(req,res)=>{
    console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS exists:", !!process.env.SMTP_PASS);
  const {email,password}=req.body;
  try{
    const user=await userModel.findOne({email:email});
    if(!user){
      return res.status(400).json({message:"invalid credentials"})
    }
    const isPasswordCorrect=await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
      return res.status(400).json({message:"invalid credentials"})
    }
    generateToken(user._id,res);
    return res.status(200).json({
      _id:user._id,
      fullName:user.fullName,
      email:user.email,
      profilePic: user.profilePic
    })
  }catch(error){
    console.log("error in login controller",error.message);
    res.status(500).json({message:"Internal server error"})
  }
}

// this is logout function .
export const logout=(req,res)=>{
  try{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"succesfully logged out"})
  }catch(error){
    console.log("error in logout controller ",error.message);
    res.status(500).json({message:"Internal server error"})

  }
}


// this is checkAuth function used to verify the authentication .
export const checkAuth=(req,res)=>{
  try{
   res.status(200).json(req.user);
  }catch(error){
    console.log("error in  checkAuth controller",error.message);
    res.status(500).json({message:"internal server error"})

  }
}

// this is profile updation function , used to update the image url to cloudinary as well as to store it in the database.
export const updateProfile=async(req,res)=>{
  try{
    const {profilePic}=req.body;
    const userID=req.user._id;
    if(!profilePic){
      return res.status(400).json({message:"profile pic is required"})
    }
    const uploadResponse=await cloudinary.uploader.upload(profilePic);
    const updateUser=await userModel.findByIdAndUpdate(userID,{profilePic:uploadResponse.secure_url},{new:true})
    res.status(200).json(updateUser);

  }catch(error){
    console.log("error in update controller".error.message);
    res.status(500).json({message:"Internal server error"})

  }
}