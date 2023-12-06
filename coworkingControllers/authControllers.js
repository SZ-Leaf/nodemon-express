const { Users } = require('../db/sequelizeSetup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const login = (req, res) => {

   Users.findOne({ where: {username: req.body.username} })
   
      .then((result) => {

         if(!result){
            return res.status(404).json({message: `N'existe Pas`})
         }

         bcrypt.compare(req.body.password, result.password)
            .then((comparison) =>{
               if(!comparison){
                  return res.status(401).json({message: 'Le mot de passe invalide'})
               }
               const token = jwt.sign({
                  data: 'foobar',
               }, "secret_key" , {expiresIn: '2h'});
               res.json({message: 'Login Reussi', data: token})
            })
      })
      .catch((error) => {
         res.status(500).json({data: error.message})
      })

}

module.exports = { login }