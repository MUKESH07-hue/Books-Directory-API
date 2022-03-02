const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: true
    },
    Price:
    {
        type: Number,
        required: true
    },
    Author:
    {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model('Book', bookSchema);