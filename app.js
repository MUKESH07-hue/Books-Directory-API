const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

// Connecting to the database

mongoose.connect('mongodb://localhost:27017/Booksdb')
    .then(console.log("Connected to db"))
    .catch(err => { console.log(err) })



// app middleware
app.use(express.json());

// importing routes
const authRoute = require('./routes/authRoutes');
const bookRoute = require('./routes/bookRoutes');


// route middleware
app.use('/BookStore', authRoute);
app.use('/BookStore', bookRoute);


app.listen(6000, () => {
    console.log("Listening on Port 6000!!")
})