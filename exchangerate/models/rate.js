const mongoose = require('mongoose');
const { Schema } = mongoose;
const rateSchema = new Schema({
    src: {
        type: String,
        required: true
    },
    tgt: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Rate', rateSchema);