const { Schema, model } = require('mongoose');
const Post = new Schema({
    _id: {type: String},
    avatar: { type: String },
    author: { type: String },
    date: { type: Number },
    text: { type: String },
    likes: [],
    comments: [],
    image: [],
},);
module.exports = model('Post', Post);
