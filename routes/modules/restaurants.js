// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 model
const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/:id', (req, res) => {
    const _id = req.params.id
    return Restaurant.findById(_id)
        .lean()
        .then((restaurant) => res.render('show', { restaurant }))
        .catch((error) => console.error(error))
})

router.get('/:id/edit', (req, res) => {
    const _id = req.params.id
    return Restaurant.findById(_id)
        .lean()
        .then((restaurant) => res.render('edit', { restaurant }))
        .catch((error) => console.error(error))
})

router.post('/', (req, res) => {
  // 以解構賦值改寫
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
    const _id = req.params.id
    const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
    return Restaurant.findById(_id)
        .then((restaurant) => {
            restaurant = Object.assign(restaurant, req.body)
            return restaurant.save()
        })
        .then(() => res.redirect(`/restaurants/${_id}`))
        .catch((err) => console.log(err))
})

router.delete('/:id', (req, res) => {
    const _id = req.params.id
    return Restaurant.findById(_id)
        .then((restaurant) => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch((error) => console.log(error))
})


module.exports = router
