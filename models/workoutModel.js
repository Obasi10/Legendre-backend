const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CalculationSchema = new Schema({
  title: {
    type: String,
  },
  details: {
    type: Number,
  },
  user_id: {
    type: String,
    required: true
  },
  createdAt: {
    type:Date,
    default: Date.now
  }
}, { timestamps: true })

module.exports = mongoose.model('Calculation', CalculationSchema)