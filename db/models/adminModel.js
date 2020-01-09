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
        trim: true,
        select: false
    }
});
adminSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();
    this.password = brcypt.hashSync(this.password, 8);
    next();
})
const Admin = new mongoose.model("Admin", adminSchema);
const insertAdmin = (adminObject, callback) => {
    findAdmin({ username: adminObject.username }, (err, result) => {
        if (err) {
            return res.status(401).json({
                status: false,
                err
            })
        } else if (!result.length) {
            Admin.create(adminObject)
                .then(admin => callback(null, admin))
                .catch(err => callback(err, null))
        } else {
            res.status(401).json({
                status: false,
                message: "Error!"
            })
        }
    })
};
const findAdmin = (objectCriteria = {}, callback) => {
    Admin.find(objectCriteria)
        .then(admin => callback(null, admin))
        .catch(err => callback(err, null))
}
module.exports.insertAdmin = insertAdmin;
module.exports.findAdmin = findAdmin;