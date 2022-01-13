"use strict";
//import express from 'express';
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
function isAuth(req, res, next) {
    console.log(req.session);
    if (req.session) {
        if (req.session.user != null)
            next();
        else
            res.redirect('/login');
    }
    else
        res.redirect('/login');
}
exports.isAuth = isAuth;
;
//# sourceMappingURL=appAuthentication.js.map