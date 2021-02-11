const multer = require('multer');/*gérer les fichiers entrants (images)*/

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({/*enregistrer sur le disque*/
  destination: (req, file, callback) => {/*ou enregistrer le fichier*/
    callback(null, 'images');/*le premier arg "null" signifie qu'il n'y a pas eu d'erreur jusque-là. Le deuxième arg est le dossier où on enregistre les images*/
  },
  filename: (req, file, callback) => {/*quel nom de fichier utiliser*/
    const name = file.originalname.split(' ').join('_');/*on remplace les espaces par des underscore*/
    const extension = MIME_TYPES[file.mimetype];/*on créé l'extension du fichier*/
    callback(null, name + Date.now() + '.' + extension);
  }
});

const fileFilter = (req, file, callback) => {// on crée un filtre sur le type d'image accepté
    const extension = MIME_TYPES[file.mimetype]; 
    if (extension === 'jpg' || extension === 'png') {
        callback (null, true);
        
    } else {
        callback('Erreur : Mauvais type de fichier', false); // erreur si le fichier envoyé est différent de celui demandé
    }
};

module.exports = multer({storage: storage}).single('image'); 