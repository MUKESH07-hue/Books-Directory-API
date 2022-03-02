const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book');
const verify = require('../verifyToken');


//get all books
router.get('/Books', verify, bookController.allBooks);

// get a book with a particular id 
router.get('/Books/:BookId', verify, bookController.oneBook);

//to add a new book
router.post('/Books', verify, bookController.addBook);

//to update a book
router.patch('/Books/:BookId', verify, bookController.updateBook);

// to delete a book
router.delete('/Books/:BookId', verify, bookController.deleteBook);

module.exports = router;