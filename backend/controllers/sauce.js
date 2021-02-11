const Sauce = require('../models/Sauce');/*récup du modele*/
const fs = require('fs');/*manipulation fichier image*/

//--------------------------------------------------------------------------------------------------------------
exports.createSauce = (req, res, next) => {/*Créatin d'un objet*/
  const sauceObject = JSON.parse(req.body.sauce); /*on extrait l'objet JSON de notre req.body.sauce en transformant la chaîne de caractère en objet*/
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,/*L'opérateur spread "..." est utilisé pour faire une copie de tous les éléments de req.body*/
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`/*le front end ne connaissant pas l'url de l'image il faut le définir manuellement*/
  });
  sauce.likes = 0;
  sauce.dislikes = 0;
  sauce.save()/*enregistre la sauce dans la base de données*/
    .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

//--------------------------------------------------------------------------------------------------------------
exports.likeSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            /*Si l'utilisateur clic sur like ou dislike*/
            if (req.body.like == 1) {
                /*si l'utilisateur like et qu'il ne l'a pas déjà fait*/
                if (sauce.usersLiked.indexOf(req.body.userId) < 0) {/*indexOf: verifie dans le tableau si l'élement existe. 
                                                                      Si pas présent dans le tableau, la méthode renverra -1.*/
                    sauce.likes = sauce.likes + 1;
                    sauce.usersLiked.push(req.body.userId);/*push: ajoute l'element au tableau*/
                    sauce.save()
                        .then(() => res.status(201).json({message: "Like enregistré !"}))
                        .catch(error => res.status(400).json({error}));
                } 
            /*si l'utilisateur dislike et qu'il ne l'a pas déjà fait*/
            } else if (req.body.like == -1) {
                if (sauce.usersDisliked.indexOf(req.body.userId) < 0) {
                    sauce.dislikes = sauce.dislikes + 1;
                    sauce.usersDisliked.push(req.body.userId);
                    sauce.save()
                        .then(() => res.status(201).json({message: "Dislike enregistré !"}))
                        .catch(error => res.status(400).json({error}))
                }


            /*Si l'utilisateur re-clic sur like ou dislike pour annuler son vote*/
            } else {
                /*suppression de l'id du user dans la BD usersLiked et on enlève 1 au compteur des likes*/
                if (sauce.usersLiked.indexOf(req.body.userId) >= 0) {
                    sauce.likes = sauce.likes - 1;
                    sauce.usersLiked.splice(req.body.userId);/*splice: retirer un element du tableau*/
                    sauce.save()
                        .then(() => res.status(201).json({message: "Like supprimé !"}))
                        .catch(error => res.status(400).json({error}));
                /*suppression de l'id du user dans la BD usersDisliked et on enlève 1 au compteur des dislikes*/
                } else if (sauce.usersDisliked.indexOf(req.body.userId) >= 0) {
                    sauce.dislikes = sauce.dislikes - 1;
                    sauce.usersDisliked.splice(req.body.userId);
                    sauce.save()
                        .then(() => res.status(201).json({message: "Dislike supprimé !"}))
                        .catch(error => res.status(400).json({error}))
                } 
            }
        })
        .catch(error => res.status(404).json({error}));   
};

//--------------------------------------------------------------------------------------------------------------
exports.modifySauce = (req, res, next) => {/*put > modification d'un objet existant*/
  const sauceObject = req.file ?/*si nouvelle image*/
    {
      ...JSON.parse(req.body.sauce),/*si il existe on récupère la chaine de caractère puis on la parse en object*/
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`/*modifier l'image url*/
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })/*updateOne > mettre à jour/ modifier la sauce dans la base de donnée*/
    .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
    .catch(error => res.status(400).json({ error }));
}

//--------------------------------------------------------------------------------------------------------------
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

//--------------------------------------------------------------------------------------------------------------
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })// récupération d'une sauce unique
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
}

//--------------------------------------------------------------------------------------------------------------
exports.getAllSauces = (req, res, next) => {
  Sauce.find()/*find > renvoyer un tableau contenant toutes les Sauces dans notre base de données*/
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
}