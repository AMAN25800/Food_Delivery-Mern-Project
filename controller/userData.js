import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import userModel from "../model/userModel.js";

// Function to create JWT token with name, email, and hashedPassword
const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Controller to log in the user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect email or password" });
    }

    const token = createToken(user);

    // Send only the token, no raw user data
    res.status(200).json({
      success: true,
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to register a new user
const registeredUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user);

    // Send only the token, no raw user data
    res.status(201).json({
      success: true,
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const updatePassword=async(req,res)=>{
  const { email, newPassword } = req.body;

  try {
      // Find the user by email
      const user = await userModel.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the password
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

// Export the functions
export { createToken, loginUser, registeredUser,updatePassword };
