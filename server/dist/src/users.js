"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const mongoose = require('mongoose');
const appAuthModel = require('./models/appauth');
var express = require('express');
var session = require('express-session');
const loginHTML = "<html><head></head><body><form name = 'loginform' action='./login' method = POST><input name = 'user'><input name = 'password'><input type = submit></form></body></html>";
const signUpHTML = "<html><head></head><body><form name = 'signupform'  action='./signup' method = POST><input type=text name = 'user'><input name = 'password'><input type=text name = 'email'><input type = submit></form></body></html>";
const logout = (req, res) => {
    if (req.session) {
        console.log(req.sessionID);
        //MongoStore.destroy(req.sessionID);
        req.session = null;
        console.log(req.session);
        res.redirect('/login');
    }
    else
        res.redirect('/login');
};
const loginPage = (req, res) => {
    console.log('login called');
    console.log(req.session);
    res.send(loginHTML);
};
const signupPage = (req, res) => {
    console.log('singUp called');
    res.send(signUpHTML);
};
const checkLogin = (req, res) => {
    //console.log(req.body);
    appAuthModel.findOne({ user: req.body.user }).then((response, err) => {
        //console.log(response);
        if (response) {
            if (response.password == req.body.password) {
                console.log('Sessions are', req.session);
                req.session.user = req.body.user;
                req.session.isAuth = true;
                res.send('loggedin');
            }
            else
                res.send('fuckoff');
        }
        else {
            res.send("Invalid User");
        }
    });
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
module.exports = { loginPage, signupPage, checkLogin, newSignup, logout };
//# sourceMappingURL=users.js.map