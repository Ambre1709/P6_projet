const user = require('../models/user');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => { /*enregistrement des utilisateurs*/

  bcrypt.hash(req.body.password, 10) /*fonction pour crypter le mdp*/
    .then(hash => {
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

exports.login = (req, res, next) => {/*connecter les utilisateurs existants*/

};