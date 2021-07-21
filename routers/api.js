const express = require('express')
const route = express.Router()

const controllers = require('../controllers/api')

route
    .route('/send')
    .post(controllers.send)

route
    .route('/login')
    .post(controllers.login)

module.exports = route;