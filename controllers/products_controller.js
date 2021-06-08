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

    createToDoHome: async (req, res) => {
        let name = req.body.name
        let todo = req.body.todo
        let mood = req.body.mood
        let date = req.body.date


        FocusToDoModel.create({
            name: name,
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






}
