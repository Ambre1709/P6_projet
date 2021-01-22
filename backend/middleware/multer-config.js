const multer = require('multer');/*gérer les fichiers entrants (images)*/

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({/*enregistrer sur le disque*/
  destination: (req, file, callback) => {/*ou enregistrer le fichier*/
    callback(null, 'images');/*enregistrer dans el dossier images*/
  },
  filename: (req, file, callback) => {/*quel nom de fichier utiliser*/
    const name = file.originalname.split(' ').join('_');/*on remplace les espaces par des underscore*/
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image'); 