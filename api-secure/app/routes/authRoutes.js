const authController = require("../controllers/authController");
const tokenService = require('../services/tokenService');

module.exports = function(app) {
    app.use(function(request, response, next) {
        response.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    //Auth routes
    app.post("/api/auth/signIn", authController.signIn);
    app.post("/api/auth/signOut", [tokenService.isValidToken], authController.signOut);

    //Demo routes
    app.get("/api/auth/default", authController.default);
    app.get("/api/auth/user", [tokenService.isValidToken], authController.userDashboard);
    app.get("/api/auth/admin", [tokenService.isValidToken, tokenService.isAdmin], authController.adminDashboard);

    //User routes
    app.post("/api/user", [tokenService.isValidToken, tokenService.isAdmin], authController.createUser);    
    app.put("/api/user/:id", [tokenService.isValidToken], authController.updateUser);        
    app.delete("/api/user/:id", [tokenService.isValidToken, tokenService.isAdmin], authController.deleteUser);    
    app.get("/api/user/:id", [tokenService.isValidToken], authController.getUser);
    app.get("/api/user", [tokenService.isValidToken, tokenService.isAdmin], authController.getUsers);

    app.put("/api/user/activateDeactivateUser/:id", [tokenService.isValidToken, tokenService.isAdmin], authController.activateDeactivateUser);
    app.put("/api/user/changeUserPassword/:id", [tokenService.isValidToken], authController.changeUserPassword);

    //Person routes
    app.post("/api/person", [tokenService.isValidToken, tokenService.isAdmin], authController.createPerson);    
    app.put("/api/person/:id", [tokenService.isValidToken, tokenService.isAdmin], authController.updatePerson);
    app.delete("/api/person/:id", [tokenService.isValidToken, tokenService.isAdmin], authController.deletePerson);    
    app.get("/api/person/:id", [tokenService.isValidToken], authController.getPerson);
    app.get("/api/person", [tokenService.isValidToken], authController.getPersons);
};