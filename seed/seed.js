require('dotenv').config()
const mongoose = require('mongoose')
const _ = require('lodash')
const { ProductModel } = require('../models/products')

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
let data = [
    { name: 'Mer-Sea & Co.Avant Garden Eye Mask', price: 35, image: '/images/c5a04254-b662-4210-b297-7067c5b56f13.jpeg' },
    { name: 'Stone Essential Oil', price: 171, image: '/images/93fd70f0-3a5d-4836-871a-f7552d171fce.jpeg' },
    { name: 'Rosemarry Spa Soap', price: 56, image: '/images/85d49dac-ee76-4571-b080-b2854e379180.jpeg' },
    { name: 'Lavender Scented Candle', price: 72, image: '/images/42f10364-f9c7-4227-a015-158b8481f90b.jpeg' },
    { name: 'Relaxing Scented Candle', price: 78, image: '/images/e126a05b00747894cae7b01a3ec29b4a.jpg' },
    { name: 'Moonstone Luxury Spa Soap', price: 121, image: '/images/6646efa9-8bee-4d91-8e17-c79662e0ddea.jpeg' },
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
