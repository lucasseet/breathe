const { ProductModel } = require('../models/products');
const _ = require('lodash')

module.exports = {

    index: (req, res) => {
        ProductModel.find()
            .then(response => {
                res.render('../views/products/index', { products: response });
            })
            .catch(err => {
                console.log(err)
                res.send("db error")
            })
    },

    registerPage: (req, res) => {
        res.render('../views/users/register')
    },

    focusPage: (req, res) => {
        res.render('../views/products/focus')
    },

    show: (req, res) => {
        res.render('../views/products/show')
    }
            


}
