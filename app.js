import express from 'express';
import { url } from 'inspector';
// const appexp = express();

const app = express()
const port = 3000

const arrNames = [
   {
      id:5,
      Name: 'Paul',

   },
   {
      id:8,
      Name: 'Sary',
      
   },
   {
      id:9,
      Name: 'Mat',
      
   }
]


// app.get('/names', (req, res) => {

//    let sentence = ""

//    arrNames.forEach(name => {
//       sentence += name + " "
//    })

//    sentence += "!"
//    res.send(sentence)

// })

app.get('/names/:id', (req, res) => {

   const urlID = parseInt(req.params.id)

   let result = arrNames.find(el => el.id === urlID)

   // if(!result){
   //    result = "not found"
   // }
   // else{
   //    result = result.Name
   // }

   result ? result.Name : "not found"


   res.send(result)

})

app.listen(port, () => {
   console.log(`Example of app listening on port ${port}`)
}) 