const jwt = require('jsonwebtoken');/*package pour vérifier les tokens lors d'une connexion*/
require('dotenv').config();

module.exports = (req, res, next) => {
  try { /* pour gérer les problèmes, on utilise try…catch*/
    const token = req.headers.authorization.split(' ')[1];/*récupérer le token dans le header authorization*/
    const decodedToken = jwt.verify(token, process.env.TOKEN_LOGIN);/*vérifier le token en le décodant*/
    const userId = decodedToken.userId;// on récupère le userId qui est dans l'objet decodedToken crée juste avant
    if (req.body.userId && req.body.userId !== userId) {/*si l'id du corps de la requete est different du user ID*/
      throw 'Invalid user ID';/*erreur*/
    } else {
      next();/*si tout ok on passe au prochain middleware*/
    }
  } catch {
    res.status(401).json({/*problème authentification*/
      error: new Error('Invalid request!')
    });
  }
};