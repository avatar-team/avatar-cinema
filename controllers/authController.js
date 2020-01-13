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
        const token = _signToken(result._id);
        res.json({
            status: true,
            token,
            user: result
        })
    });
}


exports.login = (req, res) => {
    const { userName, password } = req.body;
    //checks if the username and the password in provided in the body
    if (!userName || !password) {
        res.json({
            status: false,
            error: "MUST PROVIDE BOTH USERNAME AND PASSWORD"
        })
    }
    User.findOne({ userName }).select('+password').then(user => {
        if (user) {
            brcypt.compare(password, user.password).then(bool => {
                if (!bool || !user) {
                    res.json({
                        status: false,
                        error: "Incorrect Password or Username"
                    })
                } else if (bool && user) {
                    const token = _signToken(user._id);
                    res.json({
                        status: true,
                        user,
                        token
                    })
                }
            })
        } else {
            return res.json({
                status: false,
                error: "Incorrect Password or Username"
            })
        }
    })
}

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
     * @function promisify, promisifises the jwt.verfiy, function and then calles it with the @param token and secret word.
     * and then calles the resualt on the then function so if the the token is valid and the user still exists
     * than he well be automatclly signed in // if not he well not we diracted to that protected page
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