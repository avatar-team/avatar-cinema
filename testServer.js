// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const mongoose = require("mongoose");
// const admin = require('./db/models/adminModel.js')

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

// mongoose.Promise = global.Promise;
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

// app.listen(8000,()=>{
//   admin.insertAdmin({username:"essam",password:"123123123"},(err,data)=>{
//     if(err){
//       return console.log(err)
//     }
//     console.log(data)
//   })
// })