const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CalculatedSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  detail1: {
    type: Number,
    required: true
  },
  detail2: {
    type: Number,
    required: true
  },
  detail3: {
    type: Number,
    required: true
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

module.exports = mongoose.model('Calculate', CalculatedSchema)
