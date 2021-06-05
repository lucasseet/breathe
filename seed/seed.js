require('dotenv').config()
const mongoose = require('mongoose')
const _ = require('lodash')
const { ProductModel } = require('../models/products')
console.log({
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME
})
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
let data = [
    { name: 'Mer-Sea & Co.Avant Garden Eye Mask', price: 35, image: '/images/eyemask.png' },
    { name: 'Stone Essential Oil', price: 171, image: '/images/stoneessential.png' },
    { name: 'Rosemarry Spa Soap', price: 56, image: '/images/rosemary.png' },
    { name: 'Lavender Scented Candle', price: 72, image: '/images/lavender.png' },
    { name: 'Relaxing Scented Candle', price: 78, image: '/images/relaxing.png' },
    { name: 'Moonstone Luxury Spa Soap', price: 121, image: '/images/moonstone.png' },
]

data = data.map(item => {
    item.slug = _.kebabCase(item.name)
    return item
})

let connection = null

mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(connResp => {
    connection = connResp
    return ProductModel.insertMany(data)
  })
  .then(insertResp => {
      console.log('successful data insertion')
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() => {
      if (connection !== null) {
          connection.disconnect()
      }
  })
