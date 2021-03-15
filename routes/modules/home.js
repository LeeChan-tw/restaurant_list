// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 model
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
    const userId = req.user._id
    Restaurant.find({ userId })
        .lean()
        .then((restaurants) => res.render('index', { restaurants }))
        .catch((error) => console.error(error))
})

router.get('/sort', (req, res) => {
    const userId = req.user._id
    const sort = req.query.sort
    Restaurant.find({ userId })
        .lean()
        .sort(sort)
        .then((restaurants) => res.render('index', { restaurants, sort }))
        .catch((error) => console.log(error))
})

router.get('/search', (req, res) => {
    const userId = req.user._id
    const keyword = req.query.keyword
    return Restaurant.find({ name: { $regex: keyword, $options: 'i' }, userId })
        .lean()
        .then((restaurants) => res.render('index', { restaurants, keyword }))
})

module.exports = router
