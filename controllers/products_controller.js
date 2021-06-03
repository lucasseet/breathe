const { ProductModel } = require('../models/products');
const _ = require('lodash')

module.exports = {

    index: (req, res) => {
        res.render('../views/products/index');
            
    },


}
