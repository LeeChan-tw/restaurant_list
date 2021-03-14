const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')

// require express-handlebars here
const exphbs = require('express-handlebars')

// const restaurantList = require('./restaurants.json')
// setting template engine
app.engine(
    'hbs',
    exphbs({
        defaultLayout: 'main',
        extname: '.hbs',
        helpers: {
            equal: function (v1, v2) {
                return v1 === v2
            },
        },
    })
)
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
//body-parser built into Express.js
app.use(methodOverride('_method'))

app.use(routes)

// setting static files
app.use(express.static('public'))

app.listen(port, () => {
    console.log(`http://localhost:${port} is working now`)
})
