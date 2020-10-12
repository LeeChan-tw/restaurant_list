const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // 載入 model
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

const restaurantData = require('../../restaurants.json').results

Restaurant.insertMany(restaurantData, (err, restaurants) => {
  if (err) {
    return console.error(err)
  }
})
