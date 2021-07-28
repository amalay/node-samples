const authController = require("../controllers/authController");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.post("/api/mysql", authController.createPerson);    
    app.put("/api/mysql/:id", authController.updatePerson);
    app.delete("/api/mysql/:id", authController.deletePerson);    
    app.get("/api/mysql/:id", authController.getPerson);
    app.get("/api/mysql", authController.getPersons);
};