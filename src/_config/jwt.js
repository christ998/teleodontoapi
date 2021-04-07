const jwt = require('express-jwt');

const secret = process.env.SECRET;

const auth = jwt({
  secret: secret,
  algorithms: ['HS256']
});

module.exports = auth;

