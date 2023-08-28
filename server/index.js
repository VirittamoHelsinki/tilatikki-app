// Node module imports
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// Local imports
const { port, node_env } = require('./utils/config')
const { requestLogger, unknownEndpoint, errorHandler } = require('./utils/middleware')

// Configure and connect the database.
require('./utils/connectMongoose')()

const app = express()

// Cors is required during development to allow the frontend access to
// the backend. In production, the frontend and backend are served from
// the same domain so cors is not needed. Unless other website frontends
// on different domains need to use the api.
if(node_env === 'development') app.use(cors())

// Middlewares that need to be applied before adding routes.
app.use(express.json())
app.use(express.static('build'))
app.use(requestLogger)

// Add routes
//app.use()

// Middlewares that need to be applied after adding routes.
app.use('api/*', unknownEndpoint)
app.use(errorHandler)

// Paths that are not part of the api are handled by the frontend.
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/build/index.html'));
})

// Start the server.
app.listen(port, () => {
    console.log(`tilatikki-server is running on port ${port}`)
})

// Close the database connection when the app is closed.
app.on('close', () => mongoose.connection.close())

