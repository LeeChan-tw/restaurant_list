const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const auth = require('./modules/auth')   // 引用模組

const { authenticator } = require('../middleware/auth')  // 掛載 middleware

router.use('/users', users)
router.use('/restaurants', authenticator, restaurants)
router.use('/', authenticator, home)

module.exports = router
