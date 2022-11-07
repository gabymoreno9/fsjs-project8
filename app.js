var createError = require('http-errors');
var bodyParser = require('body-parser');
var express = require('express');

var indexRouter = require('./routes/index');
var { sequelize } = require('./models');

sequelize.authenticate()
  .then(() => {
    console.log("Authenticated successfully")
    return sequelize.sync()
  })
  .then(() => {
    console.log("All models were synchronized successfully")
  })
  .catch(error => { console.log(error) })

var app = express();

// view engine setup
app.set('views', 'views');
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);

//handle errors

//this is the fallback for everything that doesn't match the 
//other routes
app.get('*', (req, res, next) => {
    next(createError(404, "Sorry! We couldn't find the page you were looking for."))
})

// if there are any errors in the routes, it jumps to this code
app.use((error, req, res, next) => {
    if (!error.status) {
        error.status = 500
    }
    if (!error.message) {
        error.message = "Sorry! There was an unexpected error on the server."
    }
    console.log(error.status, error.message)
    if (error.status === 404) {
        res.status(error.status).render('page-not-found', {error, title: "Page Not Found"})
    }
    else {
        res.status(error.status).render('error', {error, title: "Server Error"})
    }
})

module.exports = app;
