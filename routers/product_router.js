const express = require('express')
const router = express.Router()
const productController = require('../controllers/products_controller')
// const productRatingController = require('../controllers/product_ratings_controller')




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

// new (create form)
router.get('/products/new', productController.newCreateForm)

// show (Product Listing page)
router.get('/products/:slug', productController.showProductListing)

// create
router.post('/products', productController.createProducts)

// edit
router.get('/products/:slug/edit', productController.editProductPage)

// update
router.patch('/products/:slug', productController.updateProductPage)

// delete
router.delete('/products/:slug', productController.deleteProduct)


module.exports = router;