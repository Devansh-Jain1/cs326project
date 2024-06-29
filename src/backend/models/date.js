const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
    filename: {
        type: String,
        required: true,
    },
});

const DateModel = mongoose.model('Date', dateSchema);

module.exports = DateModel;
