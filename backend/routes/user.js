const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const bouncer = require ("express-bouncer")(500, 900000, 5);
// Add white-listed addresses (optional)
bouncer.whitelist.push ("127.0.0.1");

/*On utilise des routes .POST parce que le frontend va également envoyer des infos (mail et mdp)*/
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;