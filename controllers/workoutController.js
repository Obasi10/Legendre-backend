const Calculate = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id
  const calculation = await Calculate.find({user_id}).sort({createdAt: -1})
  res.status(200).json(calculation)
}

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such profile'})
  }

  const calculation = await Calculate.findById(id)

  if (!calculation) {
    return res.status(404).json({error: 'No such profile'})
  }
  
  res.status(200).json(calculation)
}


// create new workout
const createWorkout = async (req, res) => {
  const {title, detail1, detail2, detail3} = req.body

  // add doc to db
  try {
    const user_id = req.user._id
    const calculation = await Calculate.create({title, detail1, detail2, detail3, user_id})
    res.status(200).json(calculation)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such profile'})
  }
  const calculation = await Calculate.findOneAndDelete({_id: id})

  if (!calculation) {
    return res.status(400).json({error: 'No such profile'})
  }

  res.status(200).json(calculation)
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such profile'})
  }

  const calculation = await Calculate.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!calculation) {
    return res.status(400).json({error: 'No such profile'})
  }

  res.status(200).json(calculation)
}


module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}
