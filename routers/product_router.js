const express = require('express')
const router = express.Router()
const productController = require('../controllers/products_controller')


// index
router.get('/', productController.index)

// focus
router.get('/focus', productController.showFocusPage)

// create
router.post('/focus', productController.createToDoHome)



module.exports = router;