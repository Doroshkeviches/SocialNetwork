const { Schema, model } = require('mongoose');
const Chats = new Schema({
    _id: {type: String},
    messages: []
},);
module.exports = model('Chats', Chats);