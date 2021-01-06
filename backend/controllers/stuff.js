const Thing = require('../models/Thing');
const fs = require('fs');

exports.createThing = (req, res, next) => {/*Créatin d'un objet*/
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  thing.save()/*enregistre dans la base de données*/
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyThing = (req, res, next) => {/*put > modification d'un objet existant*/
  const thingObject = req.file ?/*si nouvelle image*/
    {
      ...JSON.parse(req.body.thing),/*si il existe on récupère la chaine de caractère puis on la parse en object*/
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`/*modifier l'image url*/
    } : { ...req.body };
  Thing.updateOne({ _id: req.params.id }, { ...thingIbject, _id: req.params.id })/*updateOne > mettre à jour/ modifier un object dans la base de donnée*/
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })/*trouver l'objet à supprimer dans la base de données*/
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1];/*récuperer le nom du fichier à supprimer*/
      fs.unlink(`images/${filename}`, () => {/*on le supprime avec unlink*/
        Thing.deleteOne({ _id: req.params.id })/*on supprime l'objet dans la base de données*/
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
}

exports.getAllThing = (req, res, next) => {
  Thing.find()/*find > renvoyer un tableau contenant tous les Thing dans notre base de données*/
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}