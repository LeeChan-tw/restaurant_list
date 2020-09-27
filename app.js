const express = require('express')
const app = express()
const port = 3000

//require express-handlebars here
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurants.json')
//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
    console.log('req.params.restaurant_id', req.params.restaurant_id)
    const restaurant = restaurantList.results.find(
        (restaurant) => restaurant.id.toString() === req.params.restaurant_id
    )
    res.render('show', { restaurant: restaurant })
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
    console.log(`Port:${port} is working now`)
})
