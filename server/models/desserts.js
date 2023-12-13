const mongoose = require('mongoose');

const dessertSchema = mongoose.Schema({
    thainame: String,
    engname: String,
    detail: String,
    dessertzone: String,
    sweetlevel: String,
    image: String
});

module.exports = mongoose.model('Dessert', dessertSchema)