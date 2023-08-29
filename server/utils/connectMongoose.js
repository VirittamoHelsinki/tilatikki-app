 const mongoose = require('mongoose')

const { mongoUri } = require('./config')

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

const connectMongoose = () => {
    mongoose.connect(mongoUri, options)
            .then(() => console.log('connected to databases', mongoUri))
            .catch(err => console.log('connecting to MongoDB failed', err))
}

mongoose.set('strictQuery', true)

module.exports = connectMongoose
