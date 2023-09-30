const User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1h' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token, name: user.name, description: user.description})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {name, description, email, password, review, reviewStar, reviewTitle, queryName, queryEmail, queryType, query, suscribe} = req.body

  try {
    const user = await User.signup(name, description, email, password, review, reviewStar, reviewTitle, queryName, queryEmail, queryType, query, suscribe)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token, name: user.name, description: user.description})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


// update user1

const updateUser1 = async (req, res) => {
  // const { id } = req.params

  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token'})
  }

  const token = authorization.split(' ')[1]

  const { _id } = jwt.verify(token, process.env.SECRET)
  
  const { id } = await User.findOne({ _id }).select('_id')
  
  let emptyFields = []

  if(!req.body.queryName) {
    emptyFields.push('queryName')
  }
  if(!req.body.queryEmail) {
    emptyFields.push('queryEmail')
  }
  if(!req.body.queryType) {
    emptyFields.push('queryType')
  }
  if(!req.body.query) {
    emptyFields.push('query')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such profile'})
  }
  const user = await User.findOneAndUpdate({_id: id}, 
    {
    ...req.body
  })

  if (!user) {
    return res.status(400).json({error: 'No such profile'})
  }

  res.status(200).json(user)
}

const updateUser = async (req, res) => {
  // const { id } = req.params

  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token'})
  }

  const token = authorization.split(' ')[1]

  const { _id } = jwt.verify(token, process.env.SECRET)
  
  const { id } = await User.findOne({ _id }).select('_id')
  
  let emptyFields = []

  if(!req.body.reviewTitle) {
    emptyFields.push('reviewTitle')
  }
  if(!req.body.review) {
    emptyFields.push('review')
  }
  if(!req.body.reviewStar) {
    emptyFields.push('reviewStar')
  }

  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such profile'})
  }
  const user = await User.findOneAndUpdate({_id: id}, 
    {
    ...req.body
  })

  if (!user) {
    return res.status(400).json({error: 'No such profile'})
  }

  res.status(200).json(user)
}

const updateUser2 = async (req, res) => {
  // const { id } = req.params

  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token'})
  }

  const token = authorization.split(' ')[1]

  const { _id } = jwt.verify(token, process.env.SECRET)
  
  const { id } = await User.findOne({ _id }).select('_id')


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such profile'})
  }
  const user = await User.findOneAndUpdate({_id: id}, 
    {
    ...req.body
  })

  if (!user) {
    return res.status(400).json({error: 'No such profile'})
  }

  res.status(200).json(user)
}

module.exports = { signupUser, loginUser,  updateUser1, updateUser, updateUser2}
