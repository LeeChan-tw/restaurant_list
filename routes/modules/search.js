// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 model
const Restaurant = require('../../models/restaurant')

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  return Restaurant.find({ name: { $regex: keyword, $options: 'i' } })
    .lean()
    .then((restaurants) => res.render('index', { restaurants, keyword }))
})

module.exports = router
