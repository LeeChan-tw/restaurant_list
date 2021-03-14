const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
const methodOverride = require('method-override')
// 引入驗證套件

const routes = require('./routes')
// 重構資料庫連線設定
require('./config/mongoose')

// require express-handlebars here
const exphbs = require('express-handlebars')

// const restaurantList = require('./restaurants.json')
// setting template engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    equal: function (v1, v2) { return (v1 === v2) }
  }
}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

<<<<<<< Updated upstream
app.use(routes)
=======
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  // 以解構賦值改寫
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
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
  return Restaurant.find({ name: { $regex: keyword, $options: 'i' } })
    .lean()
    .then((restaurants) => res.render('index', { restaurants, keyword }))
})
>>>>>>> Stashed changes

// setting static files
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`http://localhost:${port} is working now`)
})
