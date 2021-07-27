'use strict';
const config = require('./../../config/config');
const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(config.mongoDbConnectionString);

exports.createPerson = async (data, callback) => {
    try {        
        await mongoClient.connect();
        
        var mongodb = await mongoClient.db('AVDB');

        console.log("Connected with mongoDB successfully!");

        if(!mongodb){
            throw "MongoDB client instance not found!";
        }
    
        const collection = await mongodb.collection('AVCollection');
    
        if(!collection){
            throw "MongoDB collection not found!";
        }
        
        await collection.insertOne(data, async (err, result) => {
            if(err){
                throw err;
            }
    
            await mongoClient.close();

            callback(err, result);
        });         
    }
    catch{
        await mongoClient.close();
    }
}

exports.createPersons = async (data, callback) => {    
    try {        
        await mongoClient.connect();
        
        var mongodb = await mongoClient.db('AVDB');

        console.log("Connected with mongoDB successfully!");

        if(!mongodb){
            throw "MongoDB client instance not found!";
        }
    
        const collection = await mongodb.collection('AVCollection');
    
        if(!collection){
            throw "MongoDB collection not found!";
        }
        
        await collection.insertMany(data, async (err, result) => {
            if(err){
                throw err;
            }
    
            await mongoClient.close();

            callback(err, result);
        });         
    }
    catch{
        await mongoClient.close();
    }
}

exports.updatePerson = async (searchQuery, data, callback) => {
    try {        
        await mongoClient.connect();
        
        var mongodb = await mongoClient.db('AVDB');

        console.log("Connected with mongoDB successfully!");

        if(!mongodb){
            throw "MongoDB client instance not found!";
        }
    
        const collection = await mongodb.collection('AVCollection');
    
        if(!collection){
            throw "MongoDB collection not found!";
        }
        
        await collection.updateOne(searchQuery, { $set: data }, { upsert: false }, async (err, result) => {
            if(err){
                throw err;
            } 
            
            await mongoClient.close();
    
            callback(err, result);
        });     
    }
    catch{
        await mongoClient.close();
    }  
}

exports.deletePerson = async (searchQuery, callback) => {
    try {        
        await mongoClient.connect();
        
        var mongodb = await mongoClient.db('AVDB');

        console.log("Connected with mongoDB successfully!");

        if(!mongodb){
            throw "MongoDB client instance not found!";
        }
    
        const collection = await mongodb.collection('AVCollection');
    
        if(!collection){
            throw "MongoDB collection not found!";
        }
        
        await collection.deleteOne(searchQuery, async (err, result) => {
            if(err){
                throw err;
            } 
    
            await mongoClient.close();
            
            callback(err, result);
        });     
    }
    catch{
        await mongoClient.close();
    }    
}

exports.getPerson = async (searchQuery, options, callback) => {   
    try {        
        await mongoClient.connect();
        
        var mongodb = await mongoClient.db('AVDB');

        console.log("Connected with mongoDB successfully!");

        if(!mongodb){
            throw "MongoDB client instance not found!";
        }
    
        const collection = await mongodb.collection('AVCollection');
    
        if(!collection){
            throw "MongoDB collection not found!";
        }
        
        await collection.find(searchQuery, options).toArray( async (err, result) => {
            if(err){
                throw err;
            }      

            await mongoClient.close();

            callback(err, result);
        });         
    }
    catch{
        await mongoClient.close();
    }
}

/* db.collection('AVCollection').count(function (err, count) {
    if (err){
        throw err;
    }
    
    console.log('Total Rows: ' + count);

    client.close();
}); */