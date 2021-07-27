'use strict';
var ObjectId = require('mongodb').ObjectId;
var Service = require('../services/mongodbService');

exports.createPerson = function(req, res) {    
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }
    else{
        Service.createPerson(req.body, function(err, data) {
            if (err){
                res.send(err);
            }
                
            res.json({error: false, data: data, message: "Record created successfully!"});
        });
    }
};

exports.createPersons = function(req, res) {    
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }
    else{
        Service.createPersons(req.body, function(err, data) {
            if (err){
                res.send(err);
            }
                
            res.json({error: false, data: data, message: "Record created successfully!"});
        });
    }
};

exports.updatePerson = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }
    else{        
        var data = req.body.data;
        var searchQuery = req.body.searchQuery;

        if(req.body.searchQuery._id){
            searchQuery._id = new ObjectId(req.body.searchQuery._id);
        }

        Service.updatePerson(searchQuery, data, function(err, data) {
            if (err){
                res.send(err);
            }
                
            res.json({error: false, data: data, message: "Record updated successfully!"});            
        });
    }
};

exports.deletePerson = function(req, res) {    
    var searchQuery = req.body.searchQuery;
    var data = req.body.data;

    if(req.body.searchQuery._id){
        searchQuery._id = new ObjectId(req.body.searchQuery._id);
    }

    Service.deletePerson(searchQuery, function(err, data) {
        if (err){
            res.send(err);
        }
        
        res.json({ error: false, data: data, message: 'Record deleted successfully!' });
    });
};

exports.getPerson = function(req, res) {
    var searchQuery = req.body.searchQuery;
    var options = req.body.options;    

    if(req.body.searchQuery._id){
        searchQuery._id = new ObjectId(req.body.searchQuery._id);
    }

    Service.getPerson(searchQuery, options, function(err, data) {
        if (err){
            res.send(err);
        }

        res.json({error: false, data: data});  
    });
};

/* exports.getPersonById = function(req, res) {
    var searchQuery = { _id: new ObjectId(req.params.id) };
    const options = {        
        sort: { firstName: -1 },        
        projection: { _id: 1, firstName: 1, lastName: 1 },
    };

    Service.getPerson(searchQuery, options, function(err, data) {
        if (err){
            res.send(err);
        }
                
        res.json({error: false, data: data});
    });
}; */

/* exports.getPersonByFirstName = function(req, res) {
    var searchQuery = { firstName: req.params.firstName };
    const options = {};

    Service.getPerson(searchQuery, options, function(err, data) {
        if (err){
            res.send(err);
        }
                
        res.json({error: false, data: data});
    });
}; */

/* exports.updatePersonById = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }
    else{        
        var searchQuery = { _id: new ObjectId(req.params.id) };

        Service.updatePerson(searchQuery, req.body, function(err, data) {
            if (err){
                res.send(err);
            }
                
            res.json({error: false, data: data, message: "Record updated successfully!"});            
        });
    }
}; */

/* exports.updatePersonByFirstName = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }
    else{
        var searchQuery = { firstName: req.params.firstName };  

        Service.updatePerson(searchQuery, req.body, function(err, data) {
            if (err){
                res.send(err);
            }
                
            res.json({error: false, data: data, message: "Record updated successfully!"});            
        });
    }
}; */

/* exports.deletePersonById = function(req, res) {
    var searchQuery = { _id: new ObjectId(req.params.id) };

    Service.deletePerson(searchQuery, function(err, data) {
        if (err){
            res.send(err);
        }
        
        res.json({ error: false, data: data, message: 'Record deleted successfully!' });
    });
}; */

/* exports.deletePersonByFirstName = function(req, res) {
    var searchQuery = { firstName: req.params.firstName };  

    Service.deletePerson(searchQuery, function(err, data) {
        if (err){
            res.send(err);
        }
        
        res.json({ error: false, data: data, message: 'Record deleted successfully!' });
    });
}; */