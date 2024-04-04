import Models from '../models/index.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { generateAccessToken, generateRefreshToken } from '../service/tokenService.js';
import { sendCreated } from '../service/responseHandler.js';

// Register
export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { firstName, lastName, email, password, dateOfBirth, gender } = req.body;

    const formattedDate = `${dateOfBirth.substring(4, 8)}-${dateOfBirth.substring(2, 4)}-${dateOfBirth.substring(0, 2)}`;

    const existingUser = await Models.User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Models.User({ firstName, lastName, email, password: hashedPassword, dateOfBirth: formattedDate, gender });
    await newUser.save();

    sendCreated(res,'User registered successfully',newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Login
export const login = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await Models.User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Generate JWT token
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie('accessToken');
    res.status(200).json({ message: 'Logged out successfully' });
  }catch(error){
    console.log(error.message);
  }
  };
