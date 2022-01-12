"use strict";
//const mongoose = require('mongoose');
const appAuthModel = require('./models/appauth');
const loginHTML = "<html><head></head><body><form name = 'loginform' action='./login' method = POST><input name = 'user'><input name = 'password'><input type = submit></form></body></html>";
const signUpHTML = "<html><head></head><body><form name = 'signupform'  action='./signup' method = POST><input type=text name = 'user'><input name = 'password'><input type=text name = 'email'><input type = submit></form></body></html>";
const loginPage = (req, res) => {
    console.log('login called');
    res.send(loginHTML);
};
const signupPage = (req, res) => {
    console.log('singUp called');
    res.send(signUpHTML);
};
const checkLogin = (req, res) => {
};
const newSignup = (req, res) => {
    console.log(req.body);
    const newUser = new appAuthModel({
        user: req.body.user,
        password: req.body.password,
        email: req.body.email,
        timeStamp: new Date()
    });
    newUser.save().then((response, err) => {
        res.send(response);
    });
};
module.exports = { loginPage, signupPage, checkLogin, newSignup };
//# sourceMappingURL=users.js.map