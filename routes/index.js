const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const sort = require('./modules/sort')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')  // 掛載 middleware

router.use('/users', users)
router.use('/sort', authenticator, sort)
router.use('/', authenticator, search)
router.use('/restaurants', authenticator, restaurants)
router.use('/', authenticator, home)

module.exports = router
