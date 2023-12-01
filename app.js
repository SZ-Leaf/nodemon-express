const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

const { sequelize } = require('./db/sequelizeSetup')

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.json('Hello World !')
})

const coworkingRouter = require('./coworkingRoutes/coworkingRoutes')

app.use('/api/coworkings', coworkingRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})