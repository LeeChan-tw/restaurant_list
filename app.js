const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000

const bodyParser = require('body-parser')

const Restaurant = require('./models/restaurant')

mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// require express-handlebars here
const exphbs = require('express-handlebars')

// const restaurantList = require('./restaurants.json')
// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/restaurants/delete', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('delete', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.get('/restaurants/delete/:id', (req, res) => {
  const ID = req.params.id
  return Restaurant.findById(ID)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const ID = req.params.id
  return Restaurant.findById(ID)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().trim().includes(keyword.toLowerCase().trim())
  })
  console.log(keyword)
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

// setting static files
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`http://localhost:${port} is working now`)
})
