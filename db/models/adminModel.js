const mongoose = require('mongoose');
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
const Admin = new mongoose.model("Admin", adminSchema);


const insertAdmin = (adminObject, callback = (err, result) => {}) => {
    Admin.create(adminObject)
        .then(adminObject => callback(null, adminObject))
        .catch(err => callback(err, null))
};


const findAdmin = (objectCriteria = {}, callback) => {
    Admin.find(objectCriteria)
        .then(admin => admin.length === 1 ? callback(null, admin[0]) : callback(null, admin))
        .catch(err => callback(err, null))
}

module.exports.insertAdmin = insertAdmin;
module.exports.findAdmin = findAdmin;