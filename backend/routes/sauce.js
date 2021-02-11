//Import de express
const express = require('express');
//déclartion du routeur avec express
const router = express.Router();
//Import du controllers sauce
const sauceCtrl = require('../controllers/sauce');
//import du controllers d'authentification
const auth = require('../middleware/auth');
//Import du middleware multer config pour la gestion de fichiers
const multer = require('../middleware/multer-config');

/*ajout de "auth" pour sécuriser les routes de l'API. De cette façon, seules les requêtes authentifiées seront gérées.*/
/*multer > images*/

router.post('/', auth, multer, sauceCtrl.createSauce);			/* on applique la logique métier createThing du controleur à la route POST 		*/
router.post("/:id/like", auth, sauceCtrl.likeSauce);			/* 	      "..." 				likeSauce du controleur à la route POST (LIKE)  */
router.put('/:id', auth, multer, sauceCtrl.modifySauce);		/*	      "..." 				modifySauce du controleur à la route PUT 		*/
router.delete('/:id', auth, sauceCtrl.deleteSauce);				/*	      "..." 				deleteSauce du controleur à la route DELETE 	*/
router.get('/:id', auth, sauceCtrl.getOneSauce);				/* 	      "..." 				getOneSauce du controleur à la route GET (ID)   */
router.get('/', auth, sauceCtrl.getAllSauces);					/* 	      "..." 				getAllSauce du controleur à la route GET 		*/


module.exports = router;