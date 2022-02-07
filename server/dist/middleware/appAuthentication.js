"use strict";
//import express from 'express';
/*Verify JWT here For Auth Checks*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
function isAuth(req, res, next) {
    console.log(req.cookies.accessToken);
    //console.log(req.session);
    jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            res.sendStatus(403);
        }
        else {
            console.log(decoded);
            next();
        }
        //if(!decoded.user)
        //res.send(403);
        //res.send({signedin:true});
    });
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
//# sourceMappingURL=appAuthentication.js.map