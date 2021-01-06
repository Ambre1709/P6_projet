const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

/*On utilise des routes .POST parce que le frontend va également envoyer des infos (mail et mdp)*/
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;