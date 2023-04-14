const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const budgetRoutes = require('./routes/budget')

const app = express();

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//routes
app.use('/api/user', userRoutes)
app.use('/api/budget', budgetRoutes)

// connect to db (need to get url has not been put in .env yet)
mongoose.connect("mongodb+srv://budget:budget1234@budgetapp.bjjxed5.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening')
    })
  })
  .catch((error) => {
    console.log(error)
  })