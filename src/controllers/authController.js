const User = require('../data/models/User')
const jwt = require('jsonwebtoken')

const loginUser = async (credentials, callback) => {
  let _error
  if (!credentials.email || !credentials.password) {
    _error = 'Invalid credentials'
  }

  const user = await User.findOne({ email: credentials.email })

  if (!user) {
    _error = 'Invalid credentials'
    return callback(_error, null)
  }

  user.comparePassword(credentials.password, (error, isMatch) => {
    if (isMatch) {
      const payload = {
        id: user.id
      }
      jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '7d' }, (error, token) => {
        if (error) {
          error = 'Invalid credentials'
        }
        // On supprime le mdp du user récupérer en bdd
        const _user = user.toObject()
        delete _user.password
        return callback(_error, {
          _user,
          token
        })
      })
    } else {
      _error = 'Invalid credentials'
      return callback(_error, null)
    }
    if (error) {
      _error = 'Invalid credentials'
      return callback(_error, null)
    }
  })

  if (!user) {
    _error = 'Invalid credentials'
  }
}
module.exports = { loginUser }
