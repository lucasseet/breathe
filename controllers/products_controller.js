const { PokemonModel } = require('../models/pokemon');
const _ = require('lodash')

module.exports = {

    index: (req, res) => {
        // Pokemon
        PokemonModel.find()
            .then(response => {
                res.render('index', { pokemon: response });
            })
            .catch(err => {
                console.log(err)
                res.send("db error")
            })
    },


}
