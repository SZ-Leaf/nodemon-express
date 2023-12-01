const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000
const mockCoworkings = require('./mock-coworkings')
const coworkings = require('./mock-coworkings')

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
   res.json('Hello World !')
})



app.get('/api/coworkings', (req, res) => {

   // Afficher la phrase : Il y a ... coworkings dans la liste. 
   res.json(mockCoworkings)
})



app.get('/api/coworkings/:id', (req, res) => {
   let result = mockCoworkings.find(el => el.id === parseInt(req.params.id))

   if (!result) {
       result = `Aucun élément ne correspond à l'id n°${req.params.id}`
   }
   res.json(result)
})

// implémenter le endpoint post qui renvoie une réposne "post fonctionne"
app.post('/api/coworkings/', (req, res) => {

   // Ajouter le coworking dans le tableau, en automatisant la génération d'un id. On récupère le dernier élément du tableau et on ajoute +1 à son id.
   // let coworking = req.body

   const newId = mockCoworkings[mockCoworkings.length - 1].id + 1
   
   // let coworking = {id: newId, superficy : req.body.superficy, capacity : req.body.capacity, name: req.body.name}

   // ... SPREAD OPERATOR
   let newcoworking = { id: newId, ...req.body }
   mockCoworkings.push(newcoworking)

   // On renvoie un objet qui contient les proriétés message et data
   // message: `Le coworking a bien été ajouté`
   const result = { message: `Le coworking a bien été ajouté`, data: newcoworking }
   res.json(result)
})


// Implement endpoint put coworkings with :id, with the corresponding request from in Postman

app.put('/api/coworkings/:id', (req, res) => {
   // 
   const urlID = parseInt(req.params.id)
   let coworkingToEdit = coworkings.find(el => el.id === urlID)

   coworkingToEdit.superficy = req.body.superficy

   const result = { message : 'Coworkings Modified', data: coworkingToEdit}
   res.json(result)
})




app.listen(port, () => {
   console.log(`Example of app listening on port ${port}`)
}) 