const mongoose = require('mongoose');

const dessertSchema = mongoose.Schema({
    name: String,
    engname: String,
    detail: String,
    dessertzone: String,
    sweetlevel: Number,
    image: String
});

module.exports = mongoose.model('Dessert', dessertSchema)