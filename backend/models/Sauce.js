const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({

  userId: { type: String, required: true },/*identifiant unique MongoDB pour l'utilisateur qui a créé la sauce*/
  name: { type: String, required: true },/*nom de la sauce*/
  manufacturer: {type: String, required: true},/*fabricant de la sauce*/
  description: {type: String, required: true},/*description de la sauce*/
  imageUrl: {type: String, required: true},/*string de l'image de la sauce téléchargée par l'utilisateur*/
  mainPepper: {type: String, required: true},/*principal ingrédient dans la sauce*/
  heat: {type: Number, required: true},/*note décrivant la sauce*/
  likes: {type: Number, default: 0, required: false},/*nombre d'utilisateurs qui aiment la sauce*/
  dislikes: {type: Number, default: 0, required: false},/*nombre d'utilisateurs qui n'aiment pas la sauce*/
  usersLiked: {type: [String], required: false},/*tableau d'identifiants d'utilisateurs ayant aimé la sauce*/
  usersDisliked: {type: [String], required: false}/*tableau d'identifiants d'utilisateurs n'ayant pas aimé la sauce.*/
});

module.exports = mongoose.model('Sauce', sauceSchema);