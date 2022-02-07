import { connect, mongo } from "mongoose";
const dotenv = require('dotenv');
//const mongoose = require('mongoose');
const appAuthModel = require('./models/appauth');
var express = require('express');
var session = require('express-session');
import MongoStore from "connect-mongo";
import { response } from "express";


const loginHTML = "<html><head></head><body><form name = 'loginform' action='./login' method = POST><input name = 'user'><input name = 'password'><input type = submit></form></body></html>";
const signUpHTML = "<html><head></head><body><form name = 'signupform'  action='./signup' method = POST><input type=text name = 'user'><input name = 'password'><input type=text name = 'email'><input type = submit></form></body></html>";

dotenv.config();
console.log(process.env);
const jwt = require('jsonwebtoken');

function generateAccessToken(user:any) {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '24h' });
  }

const logout = (req:any,res:any) => {

    if(req.cookies.accessToken) 
    {
    console.log(req.cookies.accessToken);
    
    /*
    Have a server side check for actually active tokens or something longer terms
    req.session = null;
    */

    res.clearCookie('accessToken');

    res.redirect('/login');
    }
    else
    res.redirect('/login');


};

const loginPage = (req:any,res:any) => {

    

    console.log('login called');
    console.log(req.session);

    res.send(loginHTML);


};
const signupPage = (req:any,res:any) => {

    console.log('singUp called');


    res.send(signUpHTML);


};


const checkLogin = (req:any,res:any) => {

    //console.log(req.body);

    appAuthModel.findOne({user:req.body.user}).then(


            (response:any,err:any) => {

                //console.log(response);

                if(response)
                {

                    if(response.password == req.body.password)
                    {
                        /*
                        console.log('Sessions are',req.session);

                        req.session.user = req.body.user;
                        req.session.isAuth = true;
                        */


                        const accessToken = generateAccessToken({user: req.body.user});
                        console.log(accessToken);
                        res.cookie('accessToken',accessToken, {httpOnly:true});
                        res.json(req.body);

                    }
                    
                    else
                    res.sendStatus(403)

                }

                else
                {

                    res.sendStatus(403);
                }



            }





    );




};




const newSignup = (req:any,res:any) => {

    console.log(req.body);


const newUser = new appAuthModel(
{
    user : req.body.user,
    password: req.body.password,
    email: req.body.email,
    timeStamp: new Date()
}

);

newUser.save().then((response:any, err:any) => {

    const accessToken = generateAccessToken({user:req.body.user});
    console.log(accessToken);
    res.cookie('accessToken',accessToken, {httpOnly:true});
    res.json(response);

    //res.send(response);


})


};

module.exports = {loginPage, signupPage, checkLogin, newSignup, logout};