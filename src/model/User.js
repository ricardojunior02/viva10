const { Schema, model  } = require('mongoose');

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
}, { collection: 'users' });

const User = model('users', UserSchema);

module.exports = User;