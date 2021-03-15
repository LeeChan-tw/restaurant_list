const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const Restaurant = require('../restaurant') // 載入 model
const User = require('../user')
const db = require('../../config/mongoose')
const restaurantData = require('../../restaurants.json').results

const SEED_USERS = [
    {
        name: 'user1',
        email: 'user1@example.com',
        password: '12345678',
    },
    {
        name: 'user2',
        email: 'user2@example.com',
        password: '12345678',
    },,
]

db.once('open', async () => {
    await new Promise(function (resolve) {
        SEED_USERS.forEach((user, index) => {
            bcrypt
                .genSalt(10)
                .then((salt) => bcrypt.hash(user.password, salt))
                .then((hash) =>
                    User.create({
                        name: user.name,
                        email: user.email,
                        password: hash,
                    })
                )
                .then((userSeed) => {
                    const userId = userSeed._id

                    return Promise.all(
                        Array.from({ length: 3 }, (_, i) => {
                            const restaurant = restaurantData[i + index * 3]
                            restaurant['userId'] = userId
                            return Restaurant.create(restaurant)
                        })
                    )
                })
                .then(() => {
                    console.log('Seed done.')
                    if (index === SEED_USERS.length - 1) resolve()
                })
                .catch((err) => console.log(err))
        })
    })
    process.exit()
})
