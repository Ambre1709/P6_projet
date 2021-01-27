//Import de express
const express = require('express');
//déclartion du routeur
const router = express.Router();
//Import du controllers sauce
const sauceCtrl = require('../controllers/sauce');
//import du controllers auth
const auth = require('../middleware/auth');
//Import du middleware multer config pour la création des nom de fichier
const multer = require('../middleware/multer-config');

/*ajout de "auth" pour sécuriser les routes de l'API. De cette façon, seules les requêtes authentifiées seront gérées.*/
/*multer > images*/
router.post('/', auth, multer, sauceCtrl.createSauce);
router.post("/:id/like", auth, sauceCtrl.likeSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);


module.exports = router;