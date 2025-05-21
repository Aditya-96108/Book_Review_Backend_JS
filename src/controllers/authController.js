const { createUser, findUserByEmail } = require('../models/userModel');
const { generateToken } = require('../utils/jwt');
const bcrypt = require('bcrypt');
const ApiError = require('../utils/error');

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new ApiError(400, 'All fields are required');
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new ApiError(409, 'User already exists');
    }

    const user = await createUser(username, email, password);
    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, 'All fields are required');
    }

    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login };