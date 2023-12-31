require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader("Access-Control-Allow-Methods","POST, GET, PUT,PATCH, DELETE")
  res.setHeader("Access-Control-Allow-Credentials", true)
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, Content-Type")
  if (req.method === "OPTIONS") {
    res.status(200).end()
    return
  }
  next()
})
// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })

// mongoose.connect("mongodb://localhost:27017/latestdb",{
//   useNewUrlParser:true,
//   useUnifiedTopology: true,
//   family: 4
// })
// .catch(err=>console.log(err))

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))
