const express = require('express')
const router = express.Router()
const productController = require('../controllers/products_controller')


// ----------- Focus Page -----------


// Show (focus page)
router.get('/', productController.showFocusPage)

// create (to do Homepage)
router.post('/', productController.createToDoHome)

// create (focus page)
router.post('/', productController.createToDoFocus)

// Edit (focus page)
router.get('/edit/:id', productController.editToDoFocus)

// update (focus page)
router.patch('/:id', productController.updateToDoFocus)

// delete (focus page)
router.delete('/:id', productController.deleteToDoFocus)


module.exports = router;