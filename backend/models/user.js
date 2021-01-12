const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');/*1 utilisateur = 1 email*/

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);/*plugin pour s'assurer qu'aucun des deux utilisateurs ne peut partager la même adresse e-mail*/

module.exports = mongoose.model('User', userSchema);