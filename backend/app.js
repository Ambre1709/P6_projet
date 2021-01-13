const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

/*Connexion MongoDB*/
mongoose.connect('mongodb+srv://Ambre1709:<password>@cluster0.ljqsd.mongodb.net/Cluster0?retryWrites=true&w=majority',/*comment cacher le mdp vu que le repo est public*/
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');/*Accès à l'API depuis n'importe quelle origine*/
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');/*Envoie des requêtes avec les méthodes demandées*/
  next();
});

app.use(bodyParser.json());

/*importation des routes*/
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;