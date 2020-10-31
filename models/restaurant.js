const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    trim: true,
    required: true // 這是個必填欄位
  },
  name_en: {
    type: String, // 資料型別是字串
    trim: true,
    required: true // 這是個必填欄位
  },
  category: {
    type: String, // 資料型別是字串
    trim: true,
    required: true // 這是個必填欄位
  },
  image: {
    type: String, // 資料型別是字串
    trim: true,
    required: true // 這是個必填欄位
  },
  location: {
    type: String, // 資料型別是字串
    trim: true,
    required: true // 這是個必填欄位
  },
  phone: {
    type: String, // 資料型別是字串
    trim: true,
    required: true // 這是個必填欄位
  },
  google_map: {
    type: String, // 資料型別是字串
    trim: true,
    required: true // 這是個必填欄位
  },
  rating: {
    type: Number, // 資料型別是數字
    trim: true,
    min: [1.0, '至少要給1分喔'],
    max: [5.0, '最多不超過5分'],
    required: true // 這是個必填欄位
  },
  description: {
    type: String, // 資料型別是字串
    trim: true,
    required: true // 這是個必填欄位
  }

})
module.exports = mongoose.model('Restaurant', restaurantSchema)
