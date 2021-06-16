// =======================================
//              DEPENDENCIES
// =======================================
require('dotenv').config()
const express = require('express');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const session = require('express-session');
const { flash } = require('express-flash-message');
const { setUserVarMiddleware } = require('./middlewares/auth-middleware')
const productRouter = require('./routers/product_router')
const userRouter = require('./routers/user_router')
const appRouter = require('./routers')


const app = express();
const port = process.env.PORT || 3000; //tenary operator
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

// setting up middleware to support session
app.use(session({
    secret: process.env.SESSION_SECRET,
    name: 'user_session',
    resave: false,
    saveUninitialized: false,
    cookie: { path: '/', secure: false, maxAge: 3600000 } // 3600000ms = 3600s = 60mins, cookie expires in an hour
}))

app.use(flash({ sessionKeyName: 'flash_message' }))

// setting middleware to ensure global template user variable
app.use(setUserVarMiddleware)


// =======================================
//              ROUTES
// =======================================


app.use('/', appRouter)



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

