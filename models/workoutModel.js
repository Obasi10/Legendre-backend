const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CalculateSchema = new Schema({
  title: {
    type: String,
  },
  detail1: {
    type: Number,
  },
  detail2: {
    type: Number,
  },
  detail3: {
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

module.exports = mongoose.model('Calculate', CalculateSchema)
