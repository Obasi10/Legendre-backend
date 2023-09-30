const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  review: {
    type: String
  },
  reviewStar:{
    type: Number
  },
  reviewTitle:{
    type: String
  },
  queryType:{
    type: String
  },
  queryEmail:{
    type: String
  },
  queryName:{
    type: String
  },
  query:{
    type: String
  },
  suscribe:{
    type: Boolean
  }
}, { timestamps: true })

// static signup method
userSchema.statics.signup = async function(name, description, email, password, review, reviewStar, reviewTitle, queryName, queryEmail, queryType, query, suscribe) {

  // validation
  if (!email || !password || !name || !description) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough! Password should contain atleast one uppercase letter and a symbol eg. @, #')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ name, description, email, review, reviewStar, reviewTitle, queryName, queryEmail, queryType, query, suscribe: false, password: hash })

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email or password')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect email or password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)
