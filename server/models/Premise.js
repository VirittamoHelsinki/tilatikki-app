const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const premiseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    address: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    spaces: [{
        type: ObjectId,
        ref: 'Space'
    }],
    buildings: [{
        _id: {
            type: String,
            required: true
        },
        floors: [{
            floor: {
                type: Number,
                required: true
            },
            blueprint_url: {
                type: String,
                required: false
            }
        }]
    }],
    users: [{
        // Users that are allowed to add availabilities and reservations to
        // spaces in this premise.
        type: ObjectId,
        ref: 'User'
    }]
})

premiseSchema.statics.format = ({
    _id,
    name,
    address,
    spaces,
    buildings
}) => ({
    _id,
    name,
    address,
    spaces,
    buildings
})

const Premise = mongoose.model('Premise', premiseSchema)

module.exports = Premise