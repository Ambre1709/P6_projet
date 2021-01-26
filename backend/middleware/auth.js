const jwt = require('jsonwebtoken');/*package pour vérifier les tokens*/

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];/*récupérer le token*/
    const decodedToken = jwt.verify(token, process.env.TOKEN_LOGIN);/*vérifier le token en le décodant*/
    const userId = decodedToken.userId;
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