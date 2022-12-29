"use strict";
//import express from 'express';
/*Verify JWT here For Auth Checks*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveUser = exports.isAuth = void 0;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
function isAuth(req, res, next) {
    console.log(req.cookies.accessToken);
    //console.log(req.session);
    try {
        jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                res.sendStatus(403);
            }
            else {
                console.log(decoded);
                res.locals.user = decoded.user;
                next();
            }
            //if(!decoded.user)
            //res.send(403);
            //res.send({signedin:true});
        });
    }
    catch (err) {
        console.log(err);
    }
    /*
    if(req.session)
    {
        if(req.session.user != null)
        next();
        else res.redirect('/login');
    }
    else res.redirect('/login')

    */
}
exports.isAuth = isAuth;
;
function resolveUser(req, res) {
    console.log(req.cookies.accessToken);
    //console.log(req.session);
    try {
        jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                return null;
            }
            else {
                return decoded;
            }
        });
    }
    catch (err) {
        console.log(err);
        return null;
    }
}
exports.resolveUser = resolveUser;
;
//# sourceMappingURL=appAuthentication.js.map