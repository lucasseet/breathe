const express = require('express')
const router = express.Router()
const productController = require('../controllers/products_controller')



// ----------- Home Page -----------

// index (homepage)
router.get('/', productController.index)

// new
// router.get('/new', productController.newForm)


// ----------- Focus Page -----------


// Show (focus page)
router.get('/focus', productController.showFocusPage)

// create (to do Homepage)
router.post('/focus', productController.createToDoHome)

// create (focus page)
router.post('/focus', productController.createToDoFocus)

// Edit (focus page)
router.get('/edit/:id', productController.editToDoFocus)

// update (focus page)
router.patch('/focus/:id', productController.updateToDoFocus)

// delete (focus page)
router.delete('/focus/:id', productController.deleteToDoFocus)



// ----------- Product page -----------

// Index (Product page)
router.get('/products', productController.indexProductPage)

// show (Product Listing page)
router.get('/products/:id', productController.showProductListing)



module.exports = router;