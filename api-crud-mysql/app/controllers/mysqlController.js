'use strict';
var Service = require('../services/mysqlService');

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
