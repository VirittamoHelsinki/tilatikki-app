const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    premises: [{
        type: ObjectId,
        ref: 'Premise'
    }]
})

userSchema.statics.format = ({
    _id,
    firstname,
    lastname,
    email,
    premises
}) => ({
    _id,
    firstname,
    lastname,
    email,
    premises
})

const User = mongoose.model('User', userSchema)

module.exports = User