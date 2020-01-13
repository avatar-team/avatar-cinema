const Admin = require('../db/models/adminModel');
const User = require('../db/models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');


/**
 * @function _signToken creates a Token based on the @param id and based on the time given and return that token 
 * @param id is the objectId that well be used to create the token
 * @returns Token as a String 
 */
const _signToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_TIME_ADMIN });


/**
 * @function hundleSginin here the handler function receives the admin info as an Object and checks the password and the username of the admin
 * if the password and username is correct it well allow the admin to sign in and generate a token for the admin for a 10m to keep him logged-in
 * @param req HTTP request object ,expected to have the admin info in the body 
 * @param res response Object, (JSEND) if the username and password is correct, it will return the token and admin info 
 */
exports.hundleSginin = (req, res) => {
    //info of the admin 
    admin = req.body;

    //finds the admin in the database 
    Admin.findAdmin({ username: admin.username }, (err, result) => {
        if (result) {
            //compares the password with the one in the database 
            bcrypt.compare(admin.password, result.password).then(bool => {
                if (bool) {
                    //if everything checks-out it will return in the response the info of the admin and the token 
                    const token = _signToken(result._id);
                    res.status(200).json({
                        status: true,
                        message: "OK",
                        token,
                        admin: result
                    })
                } else {
                    //else it well return a erroneous JSEND response  
                    res.status(401).json({
                        status: false,
                        message: "UNAUTHORIZED ACCESS, Password is Wrong"
                    })
                }
            }).catch(err => {
                console.error(err)
            })
        } else {
            res.status(401).json({
                status: false,
                message: "Admin with this username does not exists",
                data: err
            })
        }
    })
}

/**
 * @function hundleMainDashboard returns all the users in the database, to be shown on the admin dashboard 
 * @param req HTTP request object
 * @param res response Object (JSEND) all the users in the database 
 */
exports.hundleMainDashboard = (req, res) => {
    User.findUser({}, (err, result) => {
        if (result) {
            res.status(200).json({
                status: true,
                users: result
            })
        } else {
            res.status(404).json({
                status: false,
                data: err
            })
        }
    });
}

/**
 * @function protectAdmin is a middleware that is used to check the token of the admin and is used tp protect the route of the admin dashboard
 * it well not alows access to the route of the token is not valid i.e... that is expired or not as the original generated one
 * @param req HTTP request object 
 * @param res response Object
 */
exports.protectAdmin = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
        return res.status(401).json({
            status: false,
            error: "unauthorized access!! Please Log in Again"
        })
    }
    /** 
     * verification of the token
     * @function promisify, promisifises the jwt.verfiy, function and then calles it with the @param token and secret word.
     * and then calles the resualt on the then function so if the the token is valid and the user still exists
     * than he well be automatclly signed in // if not he well not we diracted to that protected page
     * @param token is the token stored in the localstorage of the user
     * @param process.env.JWT_SECRET is the Secrect Word for JWT @note it can be anything 
     * @async @param decodedPayLoad is the payload result from the algorathem it contain the id od the object and other info about the token 
     * 
     */
    promisify(jwt.verify)(token, process.env.JWT_SECRET).then(decodedPayLoad => {
        Admin.findAdmin({ _id: decodedPayLoad.id }, (err, theAdmin) => {
            if (!theAdmin) {
                return res.status(401).json({
                    status: false,
                    error: "the Admin does not longer exists"
                })
            } else {
                //:) access is permitted :) //
                req.body.admin = theAdmin;
                next();
            }
        })
    }).catch(err => {
        return res.status(400).json({
            status: false,
            error: err
        })
    })
}