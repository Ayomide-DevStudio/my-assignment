require('dotenv').config()
const express = require('express')
const connectDB =  require('./mongodb/dbconnection')
const blogRouter = require('./routers/blogRouter')

connectDB()

const server = express()
const port = process.env.PORT || 2000

//middleware
server.use(express.json())
server.use(express.urlencoded({extended: true}))



//router
 server.use('/api', blogRouter)


server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})