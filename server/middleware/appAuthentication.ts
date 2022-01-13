//import express from 'express';

function isAuth(req:any, res:any, next:any):any {

    console.log(req.session);

    if(req.session)
    {
        if(req.session.user != null)
        next();
        else res.redirect('/login');
    }
    else res.redirect('/login')

};

export {isAuth}