const { UserModel } = require('../models/users')
const moment = require('moment')
const bcrypt = require('bcrypt')
const saltRounds = 10


module.exports = {

    registerForm: async (req, res) => {
        const messages = await req.consumeFlash('error')

        res.render('users/register', {
            messages: messages
        })

        // res.render('users/register')

    },

    loginForm: async  (req, res) => {
        const messages = await req.consumeFlash('error')

        res.render('users/login', {
            messages: messages
        })

    },

    registerUser: async (req, res) => {
        // validate first & last name
        if (!req.body.first_name || !req.body.last_name) {
            await req.flash('error', 'Name field must not be empty')

            res.redirect('/users/register')
            return
        }

        // ensure password and confirm password matches
        if (req.body.password !== req.body.password_confirm) {
            await req.flash('error', 'Password does not match')

            res.redirect('/users/register')
            return
        }

        // ensure that there is no existing user account with the same email given
        let user = null
        try {
            user = await UserModel.findOne({ email: req.body.email })
        } catch (err) {
            console.log(err)
            res.redirect('/users/register')
            return
        }
        if (user) {
            res.redirect('/users/register')
            return
        }

        const timestampNow = moment().utc()

        const generatedHash = await bcrypt.hash(req.body.password, saltRounds)

        try {
            await UserModel.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                hash: generatedHash,
                created_at: timestampNow,
                updated_at: timestampNow,
            })
        } catch(err) {
            console.log(err)
            res.redirect('/users/register')
            return
        }
        
        res.redirect('/users/login')
    },

    loginUser: async (req, res) => {
        
        let user = null

        try {
            user = await UserModel.findOne({ email: req.body.email })
        } catch(err) {
            console.log(err)
            res.redirect('/users/register')
            return
        }

        // validate email here
        if (!req.body.email) {
            await req.flash('error', 'Email field must not be empty')

            res.redirect('/users/login')

            return
        }

        // validate password here
        if (!req.body.password) {
            await req.flash('error', 'Password field must not be empty')

            res.redirect('/users/login')

            return
        }

        if (!user) {
            res.redirect('/users/register')
            return
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.hash)
        if (!isValidPassword) {
            res.redirect('/users/register')
            return
        }

        req.session.user = user
        res.redirect('/')
    },

    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/users/login')
    }

}