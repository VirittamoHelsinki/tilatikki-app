const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const spaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    area: {
        type: Number,
        required: false,
        min: 1
    },
    premise_id: {
        type: ObjectId,
        required: true,
        ref: 'Premise'
    },
    building_id: {
        type: String,
        required: true
    },
    floor: {
        type: ObjectId,
        required: true
    },
    availabilities: [{
        // Availabilities can be added by users that have rights in the premise.
        // They can also be added without a user by an api call that knows their
        // schedule.
        user_id: {
            type: ObjectId,
            required: false,
            ref: 'User'
        },
        startdate: {
            type: Date,
            required: true
        },
        enddate: {
            type: Date,
            required: true
        }
    }],
    reservations: [{
        // Reservations can be added by users that have rights in the premise.
        user_id: {
            type: ObjectId,
            required: true,
            ref: 'User'
        },
        startdate: {
            type: Date,
            required: true
        },
        enddate: {
            type: Date,
            required: true
        }
    }]
})

spaceSchema.statics.format = ({
    _id,
    name,
    area,
    premise_id,
    building_id,
    floor,
    availabilities,
    reservations
}) => ({
    _id,
    name,
    area,
    premise_id,
    building_id,
    floor,
    availabilities,
    reservations
})

const Space = mongoose.model('Space', spaceSchema)

module.exports = Space