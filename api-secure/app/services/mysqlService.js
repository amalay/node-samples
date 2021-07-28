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

//User Table
exports.validateUser = function (userName, callback) {
    dbConn.query("Select * from user where UserName = ?", userName, (err, result) => {
        if(err) {
            throw err;
        }
        
        callback(null, result);
    });
};

exports.activateDeactivateUser = function(id, data, callback){
    dbConn.query("UPDATE user SET IsActive = ? WHERE id = ?", [data.IsActive, id], (err, result) => {
        if(err) {                    
            throw err;
        }

        callback(null, result);
    });
};

exports.changeUserPassword = function(id, password, callback){
    dbConn.query("UPDATE user SET Password = ? WHERE id = ?", [password, id], (err, result) => {
        if(err) {                    
            throw err;
        }

        callback(null, result);
    });
};

exports.createUser = async (data, callback) => {
    dbConn.query("INSERT INTO user set ?", data, (err, result) => {
        if(err) {                    
            throw err;
        }
        
        callback(null, result.insertId);
    });
};

exports.updateUser = async (id, data, callback) => {
    dbConn.query("UPDATE user SET FirstName = ?, LastName = ?, Email = ? WHERE id = ?", [data.FirstName, data.LastName, data.Email, id], async (err, result) => {
        if(err) {                    
            throw err;
        }

        callback(null, result);
    });
}

exports.deleteUser = async (id, callback) => {
    dbConn.query("DELETE FROM user WHERE id = ?", [id], async (err, result) => {
        if(err) {                    
            throw err;
        }

        callback(null, result);
    });
}

exports.getUser = async (id, callback) => {
    dbConn.query("Select * from user where id = ? ", id, async (err, result) => {
        if(err) {                    
            throw err;
        }

        callback(null, result);
    });
};

exports.getUsers = async (callback) => {
    dbConn.query("Select * from user", async (err, result) => {
        if(err) {                    
            throw err;
        }

        callback(null, result);
    });
};

//Person Table
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