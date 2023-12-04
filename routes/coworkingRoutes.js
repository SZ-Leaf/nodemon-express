const express = require('express')
const router = express.Router()
const { Coworking } = require('../db/sequelizeSetup')
let mockCoworkings = require('../mock-coworkings')
// const coworking = require('../models/coworking')

router
    .route('/')
    .get((req, res) => {
      Coworking.findAll()
         .then((results) =>{
            res.json(results)
         })
         .catch(error => {
            res.json(error.message)
         })
    })
    .post((req, res) => {

        const newCoworking = { ...req.body }

        Coworking.create(newCoworking)
            .then((coworking) => {
               res.json({message : "Le Coworking a bien ete cree", data: coworking})
               console.log(coworking)
            })
            .catch((error) => {
               res.json({ message: `Le coworking n'a pas pu être créé`, data: error.message })
            })
            
      //   const result = { message: `Le coworking a bien été ajouté` }
      //   res.json(result)
    })

router
    .route('/:id')
    .get((req, res) => {
        let result = mockCoworkings.find(el => el.id === parseInt(req.params.id))

        if (!result) {
            result = `Aucun élément ne correspond à l'id n°${req.params.id}`
        }
        res.json(result)
    })
    .put((req, res) => {
        Coworking.update(req.body, {
            where: {
                id: req.params.id
            }
        })
            .then((result) => {
                // La valeur result retournée par la méthode update() est le nombre de lignes modifiées dans la table Coworkings
                if (result > 0) {
                    Coworking.findByPk(req.params.id)
                        .then((coworking) => {
                            res.json({ message: 'Le coworking a bien été mis à jour.', data: coworking })
                        })
                        .catch(error => {
                            res.json({ message: 'Une erreur est survenue.', data: error.message })
                        })
                } else {
                    res.json({ message: `Aucun coworking n'a été mis à jour.` })
                }
            })
            .catch(error => {
                res.json({ message: 'La mise à jour a échoué.', data: error.message })
            })
    })
    .delete((req, res) => {
        // A. On vérifie que l'id passé en req.params.id renvoie bien une ligne de notre table.
        Coworking.findByPk(req.params.id)
            .then((coworking) => {
                // B. Si un coworking correspond à l'id alors on exécute la méthode destroy()
                if (coworking) {
                    Coworking.destroy({ where: { id: req.params.id } })
                        // C. Si le coworking est bien supprimé, on affiche un message avec comme data le coworking récupéré dans le .findByPk()
                        .then(() => {
                            res.json({ mesage: `Le coworking a bien été supprimé.`, data: coworking })
                        })
                        // D. Si la suppression a échoué, on retourne une réponse à POSTMAN
                        .catch((error) => {
                            res.json({ mesage: `La suppression a échoué.`, data: error.message })
                        })
                } else {
                    // B Si aucun coworking ne correspond à l'id alors on retourne une réponse à POSTMAN
                    res.json({ mesage: `Aucun coworking trouvé.` })
                }
            })
            .catch((error) => {
                // E. Si une erreur est survenue dès le findByPk, on retourne une réponse à POSTMAN
                res.json({ mesage: `La requête n'a pas aboutie.` })
            })
    })

module.exports = router