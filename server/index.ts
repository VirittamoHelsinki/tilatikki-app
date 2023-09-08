import app from './app'
import { port } from './utils/config'
import logger from './configs/logger.config'

// Start the server.
app.listen(port, () => {
    logger.info(`tilatikki-server is running on port ${port}`)
})