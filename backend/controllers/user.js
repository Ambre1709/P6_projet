const bcrypt = require('bcrypt');/*cryptage mdp*/
const jwt = require('jsonwebtoken');/*package pour créer les tokens et les vérifier*/
const user = require('../models/user');

/*---------------enregistrement des utilisateurs---------------*/
exports.signup = (req, res, next) => {

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

/*---------------connecter les utilisateurs existants---------------*/
exports.login = (req, res, next) => {

 User.findOne({ email: req.body.email })/*trouver l'utilisateur pour qui l'adresse mail correspond dans la base de données*/
    .then(user => {
      if (!user) {/*Si on ne trouve pas d'utilisateur erreur 401*/
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)/*comparer le mdp envoyer avec la requête par le mdp en hash enregistré*/
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });/*si le mdp est false*/
          }
          res.status(200).json({/*si le mdp est true*/
            userId: user._id,
            token: jwt.sign(/*3 arguments demandés*/
              { userId: user._id },/*correspondance de l'id utilisateur*/
              'RANDOM_TOKEN_SECRET',/*le token*/
              { expiresIn: '24h' }/*expiration du token de 24h*/
            )
          });
        })
        .catch(error => res.status(500).json({ error }));/*erreur serveur*/
    })
    .catch(error => res.status(500).json({ error }));/*erreur serveur*/
};