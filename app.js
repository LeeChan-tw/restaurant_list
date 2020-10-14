const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000

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
const restaurant = require('./models/restaurant')
// const restaurantList = require('./restaurants.json')
// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/restaurants/:id', (req, res) => {
  const ID = Number(req.params.id)
  return Restaurant.findOne({ id: ID })
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
