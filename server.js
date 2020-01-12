const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const reservationDb = require('./db/models/reservationModel'); //might have to move them in the movieController
const authController = require('./controllers/authController')
const movieRoute = require('./routes/movieRoute')
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: './config.env' })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'build')));



app.use("/api/movies", movieRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log("not connected to database" + err)
    } else {
        console.log("connected to database")
    }
});



// // app.use(express.static(path.join(__dirname, 'client/build')));
app.post('/signup', authController.signup)
app.post('/login', authController.login)

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.listen(3000);
