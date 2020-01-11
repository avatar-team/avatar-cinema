const Admin = require('../db/models/adminModel')
const User = require('../db/models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {promisify} = require('util')

const _signToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_TIME_ADMIN });

exports.hundleSginin = (req, res) => {
    admin = req.body;
    Admin.findAdmin({ username: admin.username }, (err, result) => {
        if (result) {
            bcrypt.compare(admin.password, result.password).then(bool => {
                if (bool) {
                    const token = _signToken(result._id);
                    res.status(200).json({
                        status: true,
                        message: "OK",
                        token,
                        admin: result
                    })
                } else {
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
     * @param decodedPayLoad is the payload result from the algorathem it contain the id od the object and other info about the token 
     * 
     */
    promisify(jwt.verify)(token, process.env.JWT_SECRET).then(decodedPayLoad => {
        Admin.findAdmin({_id: decodedPayLoad.id}, (err, theAdmin)=> {
            if (!theAdmin) {
                return res.status(401).json({
                    status: false,
                    error: "the user does not longer exists"
                })
            } else {
                //:) access is permitted :) //
                req.body.user = theAdmin;
                next();
            }
        })
    })
}