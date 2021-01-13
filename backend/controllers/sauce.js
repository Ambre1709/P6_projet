const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {/*Créatin d'un objet*/
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.likes = 0;
  sauce.dislikes = 0;
  sauce.save()/*enregistre dans la base de données*/
    .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

/*exports.likeSauce = (req, res) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
          })
.catch(error => res.status(404).json({error}));   
};*/


exports.modifySauce = (req, res, next) => {/*put > modification d'un objet existant*/
  const sauceObject = req.file ?/*si nouvelle image*/
    {
      ...JSON.parse(req.body.sauce),/*si il existe on récupère la chaine de caractère puis on la parse en object*/
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`/*modifier l'image url*/
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })/*updateOne > mettre à jour/ modifier un object dans la base de donnée*/
    .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })/*trouver l'objet à supprimer dans la base de données*/
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];/*récuperer le nom du fichier à supprimer*/
      fs.unlink(`images/${filename}`, () => {/*on le supprime avec unlink*/
        Sauce.deleteOne({ _id: req.params.id })/*on supprime l'objet dans la base de données*/
          .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
}

exports.getAllSauces = (req, res, next) => {
  Sauce.find()/*find > renvoyer un tableau contenant toutes les Sauces dans notre base de données*/
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
}