const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require('../connection');
const key = 'this_is_the_secret_key';
const tokenDuration = '6000s';
// const app = express();


// app.post('/api/posts', verifyToken, (req, res)=>{
//     jwt.verify(req.token, 'secretkey', (err, authdata)=>{
//         if(err){
//             res.sendStatus(403);
//         } else { 
//            res.json({
//                message: 'Post created ...',
//                authdata: authdata
//            });
//         }
//     });
    
// });

exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined')
    {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.json({
           message: 'Authorization failed.' 
        });
    }
};


exports.verify = (req, res)=>{
    var resp = null;
    jwt.verify(req.token, key, (err, authdata)=>{
        if(!err){
            resp = authdata;
        }
        else{
            console.log('Cannot Authenticate');
        }
    });
    return resp;
};




exports.checkPassword = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const query = 'select * from Users where Username = ? and Password = PASSWORD(?)';

    connection.query(query, [username, password], (err, records, fields)=>{
        if(err || records.length == 0 || records[0].username === undefined){
            res.json({
                status : 403,
                error : err,
                message : 'Username or password is incorrect'
            });
            return false;
        }
        else {
            res.json({
                status : 200,
                message : 'Username and password is correct'
            });
            return true;
        }
    });
};

exports.login =  (req, res) =>{
    console.log(req.params);
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    console.log(username + " " + password);
    const query = 'select * from Users where Username = ? and Password = PASSWORD(?)';

    connection.query(query, [username, password], (err, records, fields)=>{
        console.log(records[0]);
        if(err || records.length == 0 || records[0].Username === undefined){
            res.json({
                error : err,
                message : 'Username or password is incorrect'
            });
            return;
        }
        const ID = records[0].ID;
        const Username = records[0].Username;
        const FirstName = records[0].FirstName;
        const LastName = records[0].LastName;
        const Email = records[0].Email;
        const user = {
            ID,
            Username,
            FirstName,
            LastName,
            Email
        };
        jwt.sign({user: user}, key, { expiresIn: tokenDuration}, (err, Token)=>{
            res.json({
                ID,
                Username,
                FirstName,
                LastName,
                Email,
                Token
            });
        });    
    });
    
};