const express = require('express');
const app = express();
const authController = require('../../controllers/authController')
const userFunctions = require('./userModel');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const adminFunction = require('./adminModel')
dotenv.config({ path: "../../convig.env" })
mongoose.Promise = global.Promise;
const User = mongoose.model('User')
app.use(express.json())


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


app.get('/', (req, res) => {
    console.log()
    checkMovieIfExists(req.body.userId, req.body.movieId)
    res.send("asd")
})



app.listen(8000, () => {


})

















// mongoose.connect('mongodb://localhost/Avatar', {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useFindAndModify: false
// }, (err) => {
//     if (err) {
//         console.log("not connected to database" + err)
//     } else {
//         console.log("connected to database")
//     }
// });

// app.use(express.json())
// const userModel = require('./userModel');
// const movieModel = require('./movieModel');	

// // app.get('*', (req, res) => {	
// //   res.send('Hello')	
// // })	

// app.get('/', authController.protect, (req, res) => {
//     res.send('HIIII')
// })



// // Here when it receive a delete request with username	
// // First we check with user if it exist in DB	
// // if exist take his ID send it to deleteUser function	
// // if there is no error send json says that user deleted	
// app.delete('/api/users/:userName', )	
//     // Get Route	
//     // Takes userName in params find it in DB	
//     // send it back as json if exist	
// app.get('/api/users/:userName', )	
//     // Get Route 	
//     // To retrieve All users from DB	
// app.get('/api/users', )	


// // Get Route 	
// // it will recieve a username as params and it will find the Genre of movies	
// // that he watched , and it will search inside DB finding the movies 	
// // with the same Genre ,,	
// // TODO: still need refactoring , and it depends on someone else work	
// // so it is not finished yet 	

// app.get('/api/users/:userName/recommendedMovies', )	

// // res.json( userData.moviesBought[0].Genre )	

// // userModel.findUser(req.params, (errUser, userData) => {	
// //   if (errUser) res.status(404).send(errUser);	
// //   movieModel.findMovies((errMovie, movieData) => {	
// //     if (errMovie) res.status(404).send(errMovie);	
// //     userModel.pushMoviesBought(userData._id, movieData._id, (errPush, result) => {	
// //       if (errPush) res.send(errPush);	
// //       res.json({ result })	
// //     })	
// //   })	
// // })	


// let user = {	
//     userName: 'Ali_Jalal',	
//     password: '00000000',	
//     firstName: 'Ali',	
//     lastName: 'Jalal',	
//     userEmail: 'aajmabilal@gmail.com',	
//     moviesBought: [],	
//     favoriteMovies: []	
// }	

// userModel.insertUser(user)	

// let movie = {	
//     Title: "John Wick",	
//     Year: 2014,	
//     Rated: "R",	
//     Genre: "Action, Crime, Thriller",	
//     Runtime: 123,	
//     Plot: "An ex-hit-man comes out of retirement",	
//     Poster: "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_SX300.jpg",	
//     imdbRating: "7.4",	
//     availability: true,	
//     price: 16,	
//     availableChairs: 39,	
//     playDate: new Date(2020, 6, 24, 12, 30, 20),	
//     movieTrailer: "aojfdbiayhg",	
//     chairs: 16	
// }	

// let movie2 = {	
//     Title: "John Wick 2",	
//     Year: 2014,	
//     Rated: "R",	
//     Genre: "Action, Crime, Thriller",	
//     Runtime: 123,	
//     Plot: "An ex-hit-man comes out of retirement",	
//     Poster: "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_SX300.jpg",	
//     imdbRating: "7.4",	
//     availability: true,	
//     price: 16,	
//     availableChairs: 39,	
//     playDate: new Date(2020, 6, 24, 12, 30, 20),	
//     movieTrailer: "aojfdbiayhg",	
//     chairs: 16	
// }	

// let movie3 = {	
//     Title: "John Wick 3",	
//     Year: 2019,	
//     Rated: "R",	
//     Genre: "Action, Crime, Thriller",	
//     Runtime: 123,	
//     Plot: "An ex-hit-man comes out of retirement",	
//     Poster: "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_SX300.jpg",	
//     imdbRating: "7.4",	
//     availability: true,	
//     price: 16,	
//     availableChairs: 32,	
//     playDate: new Date(2020, 6, 24, 12, 30, 20),	
//     movieTrailer: "aojfdbiayhg",	
//     chairs: 16	
// }	


//  movieModel.insertMovie(movie)	
//  movieModel.insertMovie(movie2)	
//  movieModel.insertMovie(movie3)	







// app.listen(8000)	app.post('/signup', authController.signup)


// const movieDb = require('./movieModel');


// app.post('/signup', authController.signup)