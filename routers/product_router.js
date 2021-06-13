const express = require('express')
const router = express.Router()
const productController = require('../controllers/products_controller')
const productRatingController = require('../controllers/product_ratings_controller')




// ----------- Home Page -----------

// index (homepage)
router.get('/', productController.index)


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

// product rating routes
router.post('/products/:slug', productRatingController.createRatings)

// Contact routes
router.get('/contact', productController.contactPage)


module.exports = router;