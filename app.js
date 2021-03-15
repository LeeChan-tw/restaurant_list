const express = require('express')
const session = require('express-session')
const app = express()
const port = process.env.PORT || 3000
const methodOverride = require('method-override')
const flash = require('connect-flash')   // 引用套件
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const routes = require('./routes')
require('./config/mongoose')

// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')

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

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
)

app.use(express.urlencoded({ extended: true }))
//body-parser built into Express.js
app.use(methodOverride('_method'))


// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
app.use(flash()) // 掛載套件
app.use((req, res, next) => {
    // 你可以在這裡 console.log(req.user) 等資訊來觀察
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    next()
})

app.use(routes)

// setting static files
app.use(express.static('public'))

app.listen(port, () => {
    console.log(`http://localhost:${port} is working now`)
})
