const express = require('express');
const router = express.Router();
const verifyPass = require('../middleware/passwordVerify');
const userCtrl = require('../controllers/user');
const bouncer = require ("express-bouncer")(60000, 300000, 5);/*contre le force brut, au bout de 5 tentatives = délai d'attente entre 1 min et 5 min*/


bouncer.blocked = function (req, res, next, remaining)
{
    res.send (429, "Too many requests have been made, " +
        "please wait " + remaining / 1000 + " seconds");
};

/*On utilise des routes .POST parce que le frontend va également envoyer des infos (mail et mdp)*/
router.post('/signup', verifyPass, userCtrl.signup);
router.post('/login', bouncer.block, userCtrl.login);


module.exports = router;