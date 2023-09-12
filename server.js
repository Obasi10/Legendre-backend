require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const Parse = require('parse/node');

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
  'rIpHbUODDzVzg2jN67SjVbJoefAmlL6ohlqMaIZN', // This is your Application ID
  'IhHvbdrgwMk30gOlcNWVZIHn1nJCVLbSNEwvD02V', // This is your Javascript key
  '2VuVWO8JelZw8O6nID1hZBZp7zcMfPqMqxgy1dLA' // This is your Master key (never use it in the frontend)
)

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
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
