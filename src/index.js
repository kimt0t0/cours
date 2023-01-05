require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

// Connection à la BDD
const connect = require('./data/helpers/db')
connect()

// On importe le logger
const logger = require('./middlewares/logger')
app.use(logger)

// Paramétrage d'Express pour le body et le JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// On branche notre route users sur le fichier correspondant
app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auth'))
app.use('/protected', require('./routes/protected'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
