'use strict';
var config = require('./../../config/config');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var User = require('../models/user');
var Service = require('../services/mysqlService');

//Sign In & Sign Out
exports.signIn = (request, response) => {
    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ error: true, accessToken: null, message: 'Please provide all required fields!' });
    }
    else{
        Service.validateUser(request.body.UserName, (err, result) => {
            if (err){
                throw err;
            }
                
            if (!result || !Array.isArray(result) || result.length < 1) {
                return response.status(404).send({ error: true, accessToken: null, message: "User not found!" });
            }

            var userDetail = result[0];
            var isValidPassword = bcrypt.compareSync(request.body.Password, userDetail.Password);
            //var isValidPassword = (request.body.Password == userDetail.Password) ? true : false;

            if(!isValidPassword){
                return response.status(401).send({ error: true, accessToken: null, message: "Invalid password!" });
            }                

            var userToken = jwt.sign(
            { 
                id: userDetail.Id
            }, 
            config.authSecretKey, 
            {
                expiresIn: 86400 // 24 hours
            });

            response.status(200).send(
            {
                id: userDetail.Id,
                userName: userDetail.UserName,
                email: userDetail.Email,
                roleId: userDetail.RoleId,
                accessToken: userToken,
                message: "User signed in successfully!",
                error: false
            });
        });
    }
};

exports.signOut = (request, response) => {
    request.logout();    
    request.session = null;
    response.redirect('/');
};

//Demo
exports.default = (request, response) => {    
    response.status(200).send({error: false, message: "Default page! It is accessible by all users."});
};
  
exports.userDashboard = (request, response) => {
    response.status(200).send({error: false, message: "User Dashboard page! It is accessible by all authenticated users."});
};

exports.adminDashboard = (request, response) => {
    response.status(200).send({error: false, message: "Admin Dashboard page! It is accessible only by authenticated users who has Admin role."});
};

//User
exports.createUser = async (request, response) => {    
    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ error: true, message: 'Please provide all required fields!' });
    }
    else{        
        var user = new User(req.body);
        
        Service.createUser(user, (err, result) => {
            if (err){
                response.send(err);
            }
                
            response.json({error: false, message: "Record created successfully!", data: result});
        });        
    }
};

exports.updateUser = (request, response) => {
    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ error: true, message: 'Please provide all required fields!' });
    }
    else{
        Service.updateUser(request.params.id, request.body, (err, result) => {
            if (err){
                response.send(err);
            }
                
            response.json({ error: false, message: 'Record updated successfully!' });
        });
    }
};

exports.deleteUser = (request, response) => {
    Service.deleteUser(request.params.id, (err, result) => {
        if (err){
            response.send(err);
        }
        
        response.json({ error: false, message: 'Record deleted successfully!' });
    });
};

exports.changeUserPassword = (request, response) => {
    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ error: true, message: 'Please provide all required fields!' });
    }
    else{
        var password = bcrypt.hashSync(request.body.Password, 8);

        Service.changeUserPassword(request.params.id, password, (err, result) => {
            if (err){
                response.send(err);
            }
                
            response.json({ error: false, message: 'Password changed successfully!' });
        });
    }
};

exports.activateDeactivateUser = (request, response) => {
    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ error: true, message: 'Please provide all required fields!' });
    }
    else{
        Service.activateDeactivateUser(request.params.id, request.body, (err, result) => {
            if (err){
                response.send(err);
            }
                
            response.json({ error: false, message: 'User activated/de-activated successfully!' });
        });
    }
};

exports.getUser = (request, response) => {
    Service.getUser(request.params.id, (err, result) => {
        if (err){
            response.send(err);
        }
            
        response.json({ error: false, data: result });
    });
};

exports.getUsers = (request, response) => {
    Service.getUsers((err, result) => {        
        if (err){
            response.send(err);
        }            
        
        response.send({ error: false, data: result });        
    });
};

//Person
exports.createPerson = (request, response) => {    
    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ error: true, message: 'Please provide all required fields!' });
    }
    else{
        Service.createPerson(request.body, (err, result) => {
            if (err){
                response.send(err);
            }
                
            response.json({error: false, message: "Record created successfully!", data: result});
        });        
    }
};

exports.updatePerson = (request, response) => {
    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ error: true, message: 'Please provide all required fields!' });
    }
    else{
        Service.updatePerson(request.params.id, request.body, (err, result) => {
            if (err){
                response.send(err);
            }
                
            response.json({ error: false, message: 'Record updated successfully!' });
        });
    }
};

exports.deletePerson = (request, response) => {
    Service.deletePerson(request.params.id, (err, result) => {
        if (err){
            response.send(err);
        }
        
        response.json({ error: false, message: 'Record deleted successfully!' });
    });
};

exports.getPerson = (request, response) => {
    Service.getPerson(request.params.id, (err, result) => {
        if (err){
            response.send(err);
        }
            
        response.json({ error: false, data: result });
    });
};

exports.getPersons = (request, response) => {
    Service.getPersons((err, result) => {        
        if (err){
            response.send(err);
        }            
        
        response.send({ error: false, data: result });        
    });
};
