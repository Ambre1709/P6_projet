const Thing = require('../models/Thing');

exports.createThing = (req, res, next) => { /*création d'un objet*/
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });
  thing.save()/*save > enregistre le thing dans la base de donnée*/
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.modifyThing = (req, res, next) => {/*put > modification d'un objet existant*/
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })/*updateOne > mettre à jour/ modifier un object dans la base de donnée*/
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.deleteThing =(req, res, next) => {/*delete > suppression*/
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
}

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