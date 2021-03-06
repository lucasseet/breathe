const _ = require('lodash')
const { ProductModel } = require('../models/products');
const { FocusToDoModel } = require('../models/focus_todos');
const { ProductRatingModel } = require('../models/product_rating');
const { UserModel } = require('../models/users');


module.exports = {

    index: (req, res) => {
        res.render('products/index')

    },

    showFocusPage: (req, res) => {


        FocusToDoModel.find()
            .then(response => {
                res.render('products/focus', { task: response })
            })
            .catch(err => {
                console.log(err)
                res.send('/')
            })
    },

    createToDoHome: (req, res) => {
        let todo = req.body.todo
        let mood = req.body.mood
        let date = req.body.date


        FocusToDoModel.create({
            todo: todo,
            mood: mood,
            date: date,
        })
            .then(response => {
                res.redirect('/focus')
            })
            .catch(err => {
                console.log(err)
                res.send('/')
            })
    },

    createToDoFocus: (req, res) => {
        let todo = req.body.todo
        let mood = req.body.mood
        let date = req.body.date


        FocusToDoModel.create({
            todo: todo,
            mood: mood,
            date: date,
        })
            .then(response => {
                res.redirect('/focus')
            })
            .catch(err => {
                console.log(err)
                res.send('/')
            })
    },

    editToDoFocus: (req, res) => {
        // find the todo from DB
        FocusToDoModel.findOne({ _id: req.params.id })
            .then(response => {
                res.render('products/edit', { task: response });
            })
            .catch(err => {
                console.log(err)
                res.send("db error")
            })
    },

    updateToDoFocus: (req, res) => {
        FocusToDoModel.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    todo: req.body.todo,
                    mood: req.body.mood,
                }
            }
        )
            .then(updateResp => {
                res.redirect('/focus')
            })
            .catch(err => {
                res.redirect('/')
            })
    },
  
    deleteToDoFocus: (req, res) => {
        FocusToDoModel.deleteOne( { _id: req.params.id } )
            .then(deleteResp => {
                res.redirect('/focus')
            })
            .catch(err => {
                console.log(err)
                res.redirect('/')
            })
    },

    indexProductPage: (req, res) => {
        ProductModel.find()
            .then(response => {
                res.render('products/products', { products: response })
            })
            .catch(err => {
                console.log(err)
                res.send('/')
            })
    },

    newCreateForm: async (req, res) => {
        const messages = await req.consumeFlash('error')

        res.render('products/new', {
            messages: messages
        })
    },

    showProductListing: (req, res) => {

        let product = {}

        ProductModel.findOne({ slug: req.params.slug })
            .then(item => {
                // if item is not found, redirect to homepage
                if (!item) {
                    res.redirect('/')
                    return
                }
                
                product = item

                // get product ratings from DB
                return ProductRatingModel.find({ product_id: item._id }).sort({ created_at: -1 });

            })
            .then(ratings => {
                res.render('products/show', {
                    products: product,
                    ratings: ratings
                })
            })
            .catch(err => {
                console.log(err)
                res.redirect('/')
            })


    },

    createProducts: async (req, res) => {
         // validate input here
         if (!req.body.name) {
            await req.flash('error', 'Name, Price & Image field must not be empty')

            res.redirect('/products/new')

            return
        }

        let slug = _.kebabCase(req.body.name)
        ProductModel.create({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            slug: slug
        })
            .then(createResp => {
                res.redirect('/products')
            })
            .catch(err => {
                console.log(err)
                res.redirect('/')
            })
    },

    editProductPage: (req, res) => {
        ProductModel.findOne({ slug: req.params.slug })
            .then(item => {
                res.render('products/edit_product', {
                    product: item,
                })
            })
            .catch(err => {
                res.redirect('/')
            })
    },

    updateProductPage: (req, res) => {
        let newSlug = _.kebabCase(req.body.name)

        ProductModel.updateOne(
            { slug: req.params.slug },
            {
                $set: {
                    name: req.body.name,
                    price: req.body.price,
                    image: req.body.image,
                    slug: newSlug
                }
            }
        )
            .then(updateResp => {
                res.redirect('/products/' + newSlug)
            })
            .catch(err => {
                res.redirect('/products/' + req.params.slug + '/show')
            })
    },

    deleteProduct: (req, res) => {
        ProductModel.deleteOne( { slug: req.params.slug } )
            .then(deleteResp => {
                res.redirect('/products')
            })
            .catch(err => {
                console.log(err)
                res.redirect('/')
            })
    },

    contactPage: (req, res) => {
                res.render('products/contact');
            
    },





}
