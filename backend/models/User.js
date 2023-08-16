const { Schema, model } = require('mongoose');
const User = new Schema({
  username: { type: String, unique: true, required: true },
  avatar: {type: String},
  password: { type: String, required: true },
  name: { type: String },
  gender: { type: String },
  age: { type: Number },
});
module.exports = model('User', User);
