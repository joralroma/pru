const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    name: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null, select: false },
    birthday: { type: String, default: null},
    registrationDate: { type: Date, default: new Date()},
    gender: { type: Number, default: 0},
    imgProfile: { type: String, default: 'https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=abeb1031d0ae462b73500a4ef2041529&auto=format&fit=crop&w=1050&q=80'}
})

module.exports = mongoose.model('User', chatSchema);