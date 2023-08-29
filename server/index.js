const app = require('./app')
const { port } = require('./utils/config')

// Start the server.
app.listen(port, () => {
    console.log(`tilatikki-server is running on port ${port}`)
})