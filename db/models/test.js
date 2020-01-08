const mongoose = require("mongoose");
const express = require('express');
const app = express();


mongoose.connect('mongodb://localhost/Avatar', (err) => {
	if (err) {
		console.log("not connected to database" + err)
	} else {
		console.log("connected to database")
	}
});

const userModel = require('./userModel');

// app.get('*', (req, res) => {
//   res.send('Hello')
// })


// Here when it receive a delete request with username
// First we check with user if it exist in DB
// if exist take his ID send it to deleteUser function
// if there is no error send json says that user deleted
app.delete('/api/users/:userName', (req, res, next) => {
  userModel.findUser(req.params, (err, data) => {
    console.log(data)
    if (err) res.status(404).send(err);
    userModel.deleteUser(data._id, (err, result) => {
      if (err) res.send('Error while deleting');
      res.json({ deleted: true });
    })
  })
})


// Get Route
// Takes userName in params find it in DB
// send it back as json if exist
app.get('/api/users/:userName', (req, res, next) => {
  userModel.findUser(req.params, (err, data) => {
    if (err) res.status(404).send(err);
    res.json({ data })
  })
})

let user = {
  userName: 'Ali_Jalal',
  password: '00000000',
  firstName: 'Ali',
  lastName: 'Jalal',
  userEmail: 'aajmabilal@gmail.com',
  moviesBought: [],
  favoriteMovies: []
}

userModel.insertUser(user)





app.listen(8000)