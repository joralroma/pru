const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    title: String,
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        text: String,
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
})

module.exports = mongoose.model('Post', postSchema);