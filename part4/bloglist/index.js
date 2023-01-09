const http = require('http')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const BlogsRouter = require('./controllers/blogs')
const { MONGODB_URI, PORT } = require('./utils/config')

const app = express()

const mongoUrl = MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', BlogsRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})