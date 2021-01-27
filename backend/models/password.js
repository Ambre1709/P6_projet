//Import de password validator
var passwordValidator = require('password-validator');
 
// création du schéma
var passwordSchema = new passwordValidator();
 
// ajout des conditions pour le mot de passe
passwordSchema
.is().min(8)                                    // Longueur min 8 caractères
.is().max(20)                                   // Longueur max 20 caractères
.has().uppercase(1)                             // Doit avoir 1 lettre majuscule minimum
.has().lowercase(1)                             // Doit avoir 1 lettre minuscule minimum
.has().digits(1)                                // Doit avoir 1 chiffres minimum
.has().not().spaces()                           // pas d'espace autorisé
.is().not().oneOf(['Passw0rd', 'Password123']); // Liste noir des mots de passe

module.exports = passwordSchema;