require('dotenv').config()

const node_env = process.env.NODE_ENV

let mongoUri = process.env.MONGODB_DEV_URI

if      (node_env === 'test')        mongoUri = process.env.MONGODB_TEST_URI
else if (node_env === 'production')  mongoUri = process.env.MONGODB_PRODUCTION_URI

const port = process.env.PORT

const secret = process.env.SECRET

module.exports = {
    node_env,
    mongoUri,
    port,
    secret
}