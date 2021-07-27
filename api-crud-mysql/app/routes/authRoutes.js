const mysqlController = require("../controllers/mysqlController");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.post("/api/mysql", mysqlController.createPerson);    
    app.put("/api/mysql/:id", mysqlController.updatePerson);
    app.delete("/api/mysql/:id", mysqlController.deletePerson);    
    app.get("/api/mysql/:id", mysqlController.getPerson);
    app.get("/api/mysql", mysqlController.getPersons);
};