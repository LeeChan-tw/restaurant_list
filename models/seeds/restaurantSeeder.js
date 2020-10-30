const Restaurant = require('../restaurant') // 載入 model
const db = require('../../config/mongoose')
db.once('open', () => {
  console.log('mongodb connected!')
})
const restaurantData = require('../../restaurants.json').results
Restaurant.insertMany(restaurantData, (err, restaurants) => {
  console.log('Seed loaded!')
  if (err) {
    return console.error(err)
  }
  db.close()
})
