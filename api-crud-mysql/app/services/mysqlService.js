'use strict';
const mysql = require('mysql');
const config = require('./../../config/config');
const dbConn = mysql.createConnection({ host: config.host, user: config.user, password: config.password, database: config.database });

/* dbConn.connect(function(err) {
  if (err){
    throw err;
  } 
  
  console.log("Mysql database connected successfully!");
}); */

exports.createPerson = async (data, callback) => {
    try {        
        await dbConn.connect(function(err) {
            if (err){
                throw err;
              } 
              
              console.log("Mysql database connected successfully!");

              dbConn.query("INSERT INTO user set ?", data, async (err, result) => {
                if(err) {                    
                    throw err;
                }

                await dbConn.close();

                callback(null, result.insertId);
            });
        });
    }
    catch{
        await dbConn.close();
    }
}

exports.updatePerson = async (id, data, callback) => {
    try {        
        await dbConn.connect(function(err) {
            if (err){
                throw err;
              } 
              
              console.log("Mysql database connected successfully!");

              dbConn.query("UPDATE user SET firstName = ?, lastName = ? WHERE id = ?", [data.FirstName, data.LastName, id], async (err, result) => {
                if(err) {                    
                    throw err;
                }

                await dbConn.close();

                callback(null, result);
            });
        });
    }
    catch{
        await dbConn.close();
    }
}

exports.deletePerson = async (id, callback) => {
    try {        
        await dbConn.connect(function(err) {
            if (err){
                throw err;
              } 
              
              console.log("Mysql database connected successfully!");

              dbConn.query("DELETE FROM user WHERE id = ?", [id], async (err, result) => {
                if(err) {                    
                    throw err;
                }

                await dbConn.close();

                callback(null, result);
            });
        });
    }
    catch{
        await dbConn.close();
    }
}

exports.getPerson = async (id, callback) => {
    try {        
        await dbConn.connect(function(err) {
            if (err){
                throw err;
              } 
              
              console.log("Mysql database connected successfully!");

              dbConn.query("Select * from user where id = ? ", id, async (err, result) => {
                if(err) {                    
                    throw err;
                }

                await dbConn.close();

                callback(null, result);
            });
        });
    }
    catch{
        await dbConn.close();
    }
}

exports.getPersons = async (callback) => {
    try {        
        await dbConn.connect(function(err) {
            if (err){
                throw err;
              } 
              
              console.log("Mysql database connected successfully!");

              dbConn.query("Select * from user", async (err, result) => {
                if(err) {                    
                    throw err;
                }

                await dbConn.close();

                callback(null, result);
            });
        });
    }
    catch{
        await dbConn.close();
    }
}