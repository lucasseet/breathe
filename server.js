// =======================================
//              DEPENDENCIES
// =======================================
require('dotenv').config()
const express = require('express');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const productsController = require('./controllers/products_controller');

const app = express();
const port = 3000;
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

// set the view engine that express will use
app.set('view engine', 'ejs')

// setting middleware to accept json and urlencoded request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting middleware to accept spoofed methods based on _method query parameter
app.use(methodOverride('_method'))
app.use(express.static('public'))


// index route
app.get('/products', productsController.index);


// Initialise MongoDB connection via Mongoose
mongoose.set('useCreateIndex', true);
mongoose.connect(
    mongoURI,
    {useNewUrlParser: true, useUnifiedTopology: true}
);

const db = mongoose.connection

// Once DB connection successfully established, do something
db.once('open', function() {
    console.log('MongoDB connection successful')

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
});
db.on('error', function() {
    console.log('MongoDB connection failed')
});

