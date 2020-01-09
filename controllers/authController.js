const userFunctions = require('../db/models/userModel.js');
const { promisify } = require('util')
const jwt = require('jsonwebtoken');
const brcypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model("User")


const signToken = id => jwt.sign({ id }, "GROUP-5-IS-THE-BEST-GROUP-EVER-AVATAR-ABOBKER-ESAM-FARED-ALI", { expiresIn: "30m" });


exports.signup = (req, res) => {
    userFunctions.insertUser(req.body, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                data: {
                    error: err
                }
            })
        }
        const token = signToken(result._id);
        res.status(201).json({
            status: true,
            token,
            data: {
                user: result
            }
        })
    });
}
exports.login = (req, res) => {
    const { userName, password } = req.body;
    //checks if the username and the password in provided in the body
    if (!userName || !password) {
        return res.status(400).json({
            status: false,
            error: "MOST PROVIDE BOTH USERNAME AND PASSWORD"
        })
    }

    User.findOne({ userName }).select('+password').then(user => {
        if (user) {
            brcypt.compare(password, user.password).then(bool => {
                if (!bool || !user) {
                    return res.status(401).json({
                        status: false,
                        error: "Incorrect Password or Username"
                    })
                } else if (bool && user) {
                    const token = signToken(user._id);
                    res.status(200).json({
                        status: true,
                        user,
                        token
                    })
                }
            })
        } else {
            return res.status(401).json({
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
        return res.json({
            status: false,
            error: "You Are not logged in "
        })
    }
    //verification of the token// 
    promisify(jwt.verify)(token, "GROUP-5-IS-THE-BEST-GROUP-EVER-AVATAR-ABOBKER-ESAM-FARED-ALI").then(decodedPayLoad => {
        User.findById(decodedPayLoad.id).then(theUser => {
            if (!theUser) {
                return res.status(401).json({
                    status: false,
                    error: "the user does not longer exists"
                })
            } else {
                next()
            }
        })
    }).catch(err => {
        return res.status(401).json({
            status: false,
            error: err
        })
    })


}