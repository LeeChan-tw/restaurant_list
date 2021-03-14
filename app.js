const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000

const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')

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
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    equal: function (v1, v2) { return (v1 === v2) }
  }
}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(routes)

// setting static files
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`http://localhost:${port} is working now`)
})
