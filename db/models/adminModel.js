const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema;

//*******************************************//
// all the functions exported from this module is in Error-First-Style// 
//*******************************************//
// mongoose library is REQUIRED//
//*******************************************//

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});
adminSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();
    this.password = bcrypt.hashSync(this.password, 8);
    next();
})


const Admin = new mongoose.model("Admin", adminSchema);

/**
 * @function insertAdmin is used to add an admin to the database 
 * @param {*} adminObject the admin object to be add to the database 
 * @param {*} callback Error-First Callback function
 */
const insertAdmin = (adminObject, callback) => {
    findAdmin({ username: adminObject.username }, (err, result) => {
        if (err) {
            callback(err, null)
        } else if (!result.length) {
            Admin.create(adminObject)
                .then(admin => callback(null, admin))
                .catch(err => callback(err, null))
        } else {
            callback({
                status: false,
                message: "Admin Username is Deplicated or Other Error"
            }, null)
        }
    })
};

/**
 * @function findAdmin is used to find an admin in the database based on the @param objectCriteria 
 * @param {*} objectCriteria criteria that is used to search the database 
 * @param {*} callback Error-First Callback function 
 */
const findAdmin = (objectCriteria = {}, callback) => {
    Admin.findOne(objectCriteria)
        .then(admin => callback(null, admin))
        .catch(err => callback(err, null))
}
module.exports.insertAdmin = insertAdmin;
module.exports.findAdmin = findAdmin;