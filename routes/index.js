var createError = require('http-errors');
var express = require('express');

var router = express.Router();
var { Book } = require('../models');
const book = require('../models/book');

router.get('/', function(req, res, next) {
  res.redirect('/books')
});

router.get('/books', async function(req, res, next) {
  try {
    let books = await Book.findAll()
    res.render('index', {books, title: "Books"})
  }
  catch (error) {
    next(error)
  }
})

router.get('/books/new', function(req, res, next) {
  res.render('new-book', {title: "New Book"})
})

router.post('/books/new', async function(req, res, next) {
  try {
    await Book.create(req.body)
    res.redirect('/books')
  }
  catch (error) {
    res.render('new-book', {title: "New Book", errors: error.errors})
  }
})

router.get('/books/:id', async function(req, res, next) {
  let bookId = req.params.id
  try {
    let book = await Book.findOne({ where: { id: bookId }})
    if (book) {
      res.render('update-book', {book, title: book.title})
    }
    else {
      next(createError(404, "Could not find any books with this id"))
    }
  }
  catch (error) {
    next(error)
  }
})

router.post('/books/:id', async function(req, res, next) {
  let bookId = req.params.id
  try {
    let book = await Book.findOne({ where: { id: bookId }})
    if (book) {
      try {
        await book.update(req.body)
        res.redirect("/books")
      } catch (error) {
        res.render('update-book', {title: book.title, book, errors: error.errors})
      }
    }
    else {
      next(createError(404, "Could not find any books with this id"))
    }
  }
  catch (error) {
    next(error)
  }
})

router.post('/books/:id/delete', async function(req, res, next) {
  let bookId = req.params.id
  try {
    let book = await Book.findOne({ where: { id: bookId }})
    if (book) {
      await book.destroy()
      res.redirect("/books")
    }
    else {
      next(createError(404, "Could not find any books with this id"))
    }
  }
  catch (error) {
    next(error)
  }
})

module.exports = router;
