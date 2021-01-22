const express = require('express');
const router = express.Router();/*création du routeur grâce à express*/

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
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