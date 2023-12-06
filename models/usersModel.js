// on définit le model user qui se traduira par une table avec ses champs dans la BDD
module.exports = (sequelize, DataTypes) => {
   return sequelize.define('Users', {
       // Model attributes are defined here
       username: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: {
             msg: "Le nom d'utilisateur est déjà pris."
         },
         validate: {
             len: {
                 msg: "Le nom d'utilisateur doit avoir un nombre de caractères compris entre 4 et 40.",
                 args: [4, 40]
             }
         },
     },
     password: {
         type: DataTypes.STRING,
         allowNull: false
     }
   });
}