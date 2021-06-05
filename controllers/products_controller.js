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
            


}
