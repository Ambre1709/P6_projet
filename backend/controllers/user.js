const bcrypt = require('bcrypt');/*cryptage mdp*/
const jwt = require('jsonwebtoken');/*package pour créer les tokens et les vérifier*/
const User = require('../models/user');/*récupération du modèle user*/
require('dotenv').config();

/*---------------enregistrement des utilisateurs---------------*/
exports.signup = (req, res, next) => {

  bcrypt.hash(req.body.password, 10) /*on hash le mdp et on execute 10 fois l'algorithme*/
    .then(hash => {/*promise, on récup le hash*/
      const user = new User({ /*nouvel uilisateur*/
        email: req.body.email,
        password: hash /*hash = mdp crypté*/
      });
      user.save()/*enregistrer l'utilisateur dans la base de donnée*/
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))/*201 création de ressources*/
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));/*500 erreur serveur*/
};

/*---------------connecter les utilisateurs existants---------------*/
exports.login = (req, res, next) => {

 User.findOne({ email: req.body.email })/*trouver l'utilisateur pour qui l'adresse mail correspond dans la base de données*/
    .then(user => {/*on vérifie si on a récupéré un user ou non*/
      if (!user) {/*Si on ne trouve pas d'utilisateur erreur 401*/
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)/*si oui, comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données*/
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });/*si le mdp ne correspond pas*/
          }
          res.status(200).json({/*si le mdp est true on renvoi un obj json*/
            userId: user._id,   /* avec l'id*/
            token: jwt.sign(    /*et avec un token /// 3 arguments demandés: */
              { userId: user._id },/*correspondance de l'id utilisateur*/
              process.env.TOKEN_LOGIN,/*le token*/
              { expiresIn: '24h' }/*expiration du token de 24h*/
            )
          });
        })
        .catch(error => res.status(500).json({ error }));/*erreur serveur*/
    })
    .catch(error => res.status(500).json({ error }));/*erreur serveur*/
};