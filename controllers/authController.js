const userFunctions = require('../db/models/userModel.js');
const jwt = require('jsonwebtoken')
exports.signup = (req, res) => {

    userFunctions.insertUser(req.body, (err, result) => {


        // const generateAuthToken = (user, callback) => {
        //     // prive key should be  {process.env.JWT_KEY}
        //     jwt.sign(
        //       { _id: user._id },
        //       "private key",
        //       { expiresIn: "5m" },
        //       (err, token) => {
        //         if (err) throw err;
        //         user.tokens = user.tokens.concat({ token });
        //         user
        //           .save()
        //           .then(user => callback(user, token))
        //           .catch(err => {
        //             throw err;
        //           });
        //       }
        //     );
        //   };


        const x = jwt.sign({ id: result._id.toString() }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_TIME })

        if (err) {
            return res.status(500).json({
                status: 'fail',
                data: {
                    Error: err
                }
            })
        }
        res.status(201).json({
            status: 'success',
            data: {
                user: result
            }
        })
    });
}

exports.login = (req, res, next) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.json({
            status: "fail",
            error: new Error("MOST PROVIDE BOTH USERNAME AND PASSWORD")
        })
    }

}