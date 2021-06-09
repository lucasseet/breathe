const _ = require('lodash')
const { ProductModel } = require('../models/products');
const { FocusToDoModel } = require('../models/focus_todos')

module.exports = {

    index: (req, res) => {
        ProductModel.find()
            .then(response => {
                res.render('products/index');
            })
            .catch(err => {
                console.log(err)
                res.send("db error")
            })
    },

    // newForm: (req, res) => {

    //     res.render('products/edit')
    // },

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

    showProductListing: (req, res) => {

        ProductModel.findOne({ _id: req.params.id })
            .then(response => {
                res.render('products/show', { products: response });
            })
            .catch(err => {
                console.log(err)
                res.send("db error")
            })
    },






}
