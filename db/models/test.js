const express = require('express');
const app = express();
const authController = require('../../controllers/authController')
const userFunctions = require('./userModel');
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: "../../convig.env" })


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Avatar', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
}, (err) => {
    if (err) {
        console.log("not connected to database" + err)
    } else {
        console.log("connected to database")
    }
});

app.use(express.json())



app.post('/signup', authController.signup)

app.listen(3456);