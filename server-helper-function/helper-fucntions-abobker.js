const bcrypt = require('bcrypt');

//*******************************************//
//bcrypt library are REQUIRED//
//*******************************************//

//this function is used to hush a password
//it accepts only one @(param) password 
//and return a hashed version of that password
//e.g.. 
//@(param) password = 123123
//@(return) = $2b$08$n84teUcpD7AMY2lrL2yMKOQ/Q/OGUKTMAuNAX1MbaZBsNzTlWBOqC
const generateHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}


//this function is used to validate a password
//it accepts two parametars @(param) password and @(param) hashedPassword
//and return a @(type) Boolean true of both version matched or false of they do Not
//e.g..//              from the above examples
//@(param) password = 123123 ,hashedPassword = $2b$08$n84teUcpD7AMY2lrL2yMKOQ/Q/OGUKTMAuNAX1MbaZBsNzTlWBOqC
//@(return) = true;
//@(param) password = qweasd , @(param) hashedPassword = $2b$08$n84teUcpD7AMY2lrL2yMKOQ/Q/OGUKTMAuNAX1MbaZBsNzTlWBOqC
//@(return) = false;
const validPassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}