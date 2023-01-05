const mongoose = require('mongoose')

const connect = () => {
  console.log(process.env)
  mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`)
    .then(() => {
      console.log('Database connect')
    })
    .catch((error) => {
      console.error('Error' + JSON.stringify(error))
    })
}

module.exports = connect
