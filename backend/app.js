const express = require('express');
const helmet = require('helmet');/*sécurise les appli Express en définissant divers en-têtes HTTP*/
const bodyParser = require('body-parser');/*package pour gérer la demande POST provenant de l'application front-end, 
et être capables d'extraire l'objet JSON de la demande.*/
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config()/*variable d'environnement*/
const path = require('path');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

/*Connexion MongoDB*/
mongoose.connect(process.env.DB_MONGO_CONNECT,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();/*créer une application express*/

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');/*Accès à l'API depuis n'importe quelle origine*/
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');/*ajouter les headers mentionnés aux requêtes envoyées vers notre API*/
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');/*Envoie des requêtes avec les méthodes demandées*/
  next();
});

app.use(bodyParser.urlencoded({extended:true})); /*fonction body parser pour express mongo sanitize*/
app.use(bodyParser.json()); /*transformer le corps des requêtes en objets JSON*/
app.use(mongoSanitize()); /*mongo sanitize contre l'injection (enlève les mauvais caractères)*/


app.use(helmet());

/*importation des routes*/
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;