const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const { Schema } = mongoose

const userSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-z0-9\-_.]+@[a-z]+\.[a-z]{2,3}$/i
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

// Remplace le mdp user par un mdp crypté
userSchema.pre('save', function (next) {
  // On récupère le user avec this
  const user = this
  if (this.isModified('password') || this.isNew) {
    // On génère du "sel"= clef aléatoire pour hash le mdp
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        throw new Error(error)
      }
      // On hash le mdp avec le "sel"
      bcrypt.hash(this.password, salt, (error, hash) => {
        if (error) {
          throw new Error(error)
        }
        this.password = hash

        return next()
      })
    })
  }
})

userSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (error, isMatch) => {
    if (error) {
      return callback(error, null)
    }
    return callback(null, isMatch)
  })
}

module.exports = mongoose.models.User || mongoose.model('User', userSchema)
