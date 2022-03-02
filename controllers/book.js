const Book = require('../models/Book');

exports.allBooks = async (req, res) => {
    try {
        const Books = await Book.find();
        res.status(200).json({
            message: "All Books",
            data: Books
        })
    } catch (error) {
        res.status(400).json({
            data: error
        })
    }
}

exports.addBook = async (req, res) => {
    try {

        const book = new Book({
            title: req.body.title,
            Price: req.body.Price,
            Author: req.body.Author
        })

        const savedBook = await book.save();

        res.status(200).json({
            message: "Book Added Successfully !!",
            data: savedBook
        })

        res.status(400).json({
            title: Book.title,
            message: "Already present int the database"
        })


    } catch (error) {
        res.status(400).json({
            data: error
        })
    }
}

exports.oneBook = async (req, res) => {
    try {
        const id = req.params.BookId;

        const singleBook = await Book.findById(id);

        if (singleBook) {
            res.status(200).json({
                data: singleBook
            })
        }
        else {
            res.status(400).send("Book not found");
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.BookId);
        if (book) {
            const updateBook = await Book.updateOne(book, req.body);
            res.status(200).json({
                message: "Book Updated",
                data: updateBook
            })
        }
        else {
            res.status(400).send("Book not found");
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.BookId);
        if (book) {
            const deleteBk = await Book.findByIdAndDelete(book);
            res.status(200).send({
                message: "Book Removed from the database",
                data: deleteBk
            })
        }
        else {
            res.status(400).send("Book not found");
        }
    } catch (error) {
        res.status(400).send(error);
    }
}