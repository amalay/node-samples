'use strict';
const mysql = require('mysql');
const config = require('./../../config/config');
const dbConn = mysql.createConnection({ host: config.mysql.host, user: config.mysql.user, password: config.mysql.password, database: config.mysql.database });

dbConn.connect(function(err) {
  if (err){
    throw err;
  } 
  
  console.log("Mysql database connected successfully!");
});
  
exports.createPerson = async (data, callback) => {
    dbConn.query("INSERT INTO person set ?", data, async (err, result) => {
        if(err) {                    
            throw err;
        }

        callback(null, result.insertId);
    });
}

exports.updatePerson = async (id, data, callback) => {
    dbConn.query("UPDATE person SET FirstName = ?, LastName = ? WHERE id = ?", [data.FirstName, data.LastName, id], async (err, result) => {
        if(err) {                    
            throw err;
        }

        callback(null, result);
    });
}

exports.deletePerson = async (id, callback) => {
    dbConn.query("DELETE FROM person WHERE id = ?", [id], async (err, result) => {
        if(err) {                    
            throw err;
        }

        callback(null, result);
    });
}

exports.getPerson = async (id, callback) => {
    dbConn.query("Select * from person where id = ? ", id, async (err, result) => {
        if(err) {                    
            throw err;
        }

        callback(null, result);
    });
}

exports.getPersons = async (callback) => {
    dbConn.query("Select * from person", async (err, result) => {
        if(err) {                    
            throw err;
        }

        callback(null, result);
    });
}