const Restaurant = require('../restaurant') // 載入 model
const db = require('../../config/mongoose')

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
