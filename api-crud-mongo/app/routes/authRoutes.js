const mongodbController = require("../controllers/mongodbController");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.post("/api/mongodb/createPerson", mongodbController.createPerson);
    app.post("/api/mongodb/createPersons", mongodbController.createPersons);  
    app.put("/api/mongodb/updatePerson", mongodbController.updatePerson);
    app.delete("/api/mongodb/deletePerson", mongodbController.deletePerson);
    app.get("/api/mongodb/getPerson", mongodbController.getPerson);
};