const userFunctions = require('../db/models/userModel.js');
const { promisify } = require('util')
const jwt = require('jsonwebtoken');
const brcypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model("User")

/**
 * @function _signToken creates a Token based on the @param id and based on the time given and return that token 
 * @param id is the objectId that well be used to create the token
 * @returns Token as a String 
 */
const _signToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_TIME });

/**
 * @function signup inserts a user into the database
 * @param req HTTP request object @note it expected that the user object well be in the body of the req 
 * @param res response Object (JSEND) containing  the created user Object and the token for that specific user 
 */
exports.signup = (req, res) => {
    userFunctions.insertUser(req.body, (err, result) => {
        if (err) {
            res.json({
                status: false,
                data: {
                    error: err
                }
            })
        }
        //here we sign the token for that specific using his objectId  
        const token = _signToken(result._id);
        res.json({
            status: true,
            token,
            user: result
        })
    });
}

/**
 * @function login checks of the provided  user info is valid, if so, it will  generate a new token, and sign that user in 
 * @param req HTTP request object 
 * @param res response Object (JSEND) containing the user and the token  
 */
exports.login = (req, res) => {
    const { userName, password } = req.body;
    //checks if the username and the password in provided in the body
    if (!userName || !password) {
        res.json({
            status: false,
            error: "MUST PROVIDE BOTH USERNAME AND PASSWORD"
        })
    }
    //checks the user in the database   
    User.findOne({ userName }).select('+password').then(user => {
        //if the user is found, then it well compare the password that he entered with the one in the database 
        if (user) {
            brcypt.compare(password, user.password).then(bool => {
                    //if the password does not match it well return erroneous JSEND response 
                    if (!bool || !user) {
                        res.json({
                                status: false,
                                error: "Incorrect Password or Username"
                            })
                            //else if the password is correct and everything checks out it well return that user, and the token associated with that specific user
                    } else if (bool && user) {
                        const token = _signToken(user._id);
                        res.json({
                            status: true,
                            user,
                            token
                        })
                    }
                })
                //if no user is find in that base it well return erroneous JSEND
        } else {
            return res.json({
                status: false,
                error: "Incorrect Password or Username"
            })
        }
    })
}

/**
 * @function protect is a middleware that is used to check the token of the user and is used to protect the route of the user dashboard
 * it well not allow access to the route of the token is not valid i.e.. expired or not as the original generated one
 * @param req HTTP request object 
 * @param res response Object
 */
exports.protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
        return res.status(404).json({
            status: false,
            error: "You Are not logged in "
        })
    }

    /** 
     * verification of the token
     * @function promisify, promisifises the jwt.verfiy, function and then calls it with the @param token and secret word.
     * and then calls the result on that function so if the token is valid and the user still exists
     * than he well be automatically be signed in // if not he well not we directed to that protected page
     * @param token is the token stored in the localstorage of the user
     * @param process.env.JWT_SECRET is the Secrect Word for JWT @note it can be anything 
     * @param decodedPayLoad is the payload result from the algorathem it contain the id od the object and other info about the token 
     * 
     */
    promisify(jwt.verify)(token, process.env.JWT_SECRET).then(decodedPayLoad => {
        User.findById(decodedPayLoad.id).then(theUser => {
            if (!theUser) {
                return res.status(401).json({
                    status: false,
                    error: "the user does not longer exists"
                })
            } else {
                //:) access is permitted :) //
                //it well attach the user to the body of the request of access is permitted 
                //no it can be used in the next route 
                req.body.user = theUser;
                next();
            }
        })
    }).catch(err => {
        return res.status(401).json({
            status: false,
            error: err
        })
    })
}