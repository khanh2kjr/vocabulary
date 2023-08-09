const UserModel = require('../models/user.model')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const checkIfUserIsLoggedIn = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select('-password')
    if (!user)
      return res.status(400).json({
        success: false,
        message: 'User not found.',
      })
    res.json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    })
  }
}
const registerUser = async (req, res) => {
  const { username, password, firstName, lastName } = req.body
  if (!username || !password || !firstName || !lastName) {
    return res.status(400).json({
      success: false,
      message: 'Missing fields',
    })
  }
  try {
    const user = await UserModel.findOne({ username })
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'Username already taken.',
      })
    }
    const hashedPassword = await argon2.hash(password)
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      firstName,
      lastName,
    })
    await newUser.save()
    const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
    res.json({
      success: true,
      message: 'User created successfully.',
      accessToken,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    })
  }
}
const loginUser = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Missing username and/or password.',
    })
  }
  try {
    const user = await UserModel.findOne({ username })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect username or password.',
      })
    }
    const passwordValid = await argon2.verify(user.password, password)
    if (!passwordValid) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect username or password.',
      })
    }
    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)
    res.json({
      success: true,
      message: 'User logged in successfully.',
      accessToken,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    })
  }
}
module.exports = {
  checkIfUserIsLoggedIn,
  registerUser,
  loginUser,
}
