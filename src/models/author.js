const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    name: { type: String, default: null }
})

module.exports = mongoose.model('Author', authorSchema);