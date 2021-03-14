const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const sort = require('./modules/sort')
const users = require('./users')

router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/', search)
router.use('/sort', sort)
router.use('/users', users)

module.exports = router
