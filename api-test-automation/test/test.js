var chai = require('chai');
//let chaiHttp = require('chai-http');
var expect = chai.expect;
let should = chai.should();
var supertest = require("supertest");
var server = supertest.agent("http://localhost:5000");  //Set agent with server address and port where program is runninng.

var randomNumber = 123;
var newlyCreatedUserId = 0;
var userAccessToken = "";
var adminAccessToken = "";
var userLogin = {
  UserName: 'user',
  Password: "user"
};
var adminLogin = {
  UserName: 'admin',
  Password: "admin"
};

//===============================================================================================
//Default Page Api  
//===============================================================================================
describe("DefaultPageApi", () => {
  it("Get - Success! Default page api should be returned", async () => {  
    const response = await server.get('/');

    expect(response.status).to.equal(200);
    expect(response.body.error).to.equal(false);
    //expect(1).to.equal(1);
  });
});

//===============================================================================================
//Login Api  
//===============================================================================================
describe("SignInApi", () => {
  it("User login - Failed! Required all mandatory fields", async () => {  
    const response = await server.post("/api/auth/signIn").send({ });

    expect(response.status).to.equal(400);
    expect(response.body.error).to.equal(true);
    expect(response.body.message).to.equal('Please provide all required fields!');
    expect(response.body.accessToken).to.equal(null);
  });

  it("User login - Failed! User not found", async () => {  
    const response = await server.post("/api/auth/signIn").send({ UserName: 'xxxx', Password: "user" });

    expect(response.status).to.equal(404);
    expect(response.body.error).to.equal(true);
    expect(response.body.message).to.equal('User not found!');
    expect(response.body.accessToken).to.equal(null);
  });

  it("User login - Failed! Invalid password", async () => {  
    const response = await server.post("/api/auth/signIn").send({ UserName: 'user', Password: "xxxx" });

    expect(response.status).to.equal(401);
    expect(response.body.error).to.equal(true);
    expect(response.body.message).to.equal('Invalid password!');
    expect(response.body.accessToken).to.equal(null);
  });

  it("User login - Success! And return the access token", (done) => {      
    server.post("/api/auth/signIn").send(userLogin)
    .expect("Content-type", /json/).expect(200).end((err, response) => {      
        response.status.should.equal(200);
        response.body.accessToken.should.not.equal(null);
        response.body.message.should.equal('User signed in successfully!');

        done();
    });
  });
});

//===============================================================================================
//User Api  
//===============================================================================================
describe("UserApi", () => {  
  var user = {
    UserName: `test${randomNumber}`,
    Password: `test${randomNumber}`,
    FirstName: `test${randomNumber}`,
    LastName: `test${randomNumber}`,
    Email: `test${randomNumber}@abc.com`
  };

    //===============================================================================================
  //Create User Api  
  //===============================================================================================
  it("User Create - Falied! Unauthenticated user can not perform this action.", async () => { 
    let response = await server.post("/api/user").send(user);

    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal(true);
    expect(response.body.message).to.equal('No access token available!');
  });

  it("User Create - Falied! Invalid access token to perform this action.", async () => { 
    let response = await server.post("/api/user").set("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eysdfsffdfsdfsdf").send(user);

    expect(response.status).to.equal(401);
    expect(response.body.error).to.equal(true);
    expect(response.body.message).to.equal('Invalid/Expired access token!');
  });

  it("User Create - Falied! Authenticated user but not having admin priviledge to perform this action.", async () => { 
    //Get access token for user
    const loginResponse = await server.post("/api/auth/signIn").send(userLogin);

    expect(loginResponse.status).to.equal(200);
    expect(loginResponse.body.accessToken).not.equal(null);

    userAccessToken = loginResponse.body.accessToken;

    //Create user
    const response = await server.post("/api/user").set("x-access-token", userAccessToken).send(user);

    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal(true);
    expect(response.body.message).to.equal('You are not having admin priviledge to perform this action!');
  });

  it("User Create - Falied! Required all mandatory fields.", async () => { 
    //Get access token for admin
    const loginResponse = await server.post("/api/auth/signIn").send(adminLogin);

    expect(loginResponse.status).to.equal(200);
    expect(loginResponse.body.accessToken).not.equal(null);

    adminAccessToken = loginResponse.body.accessToken;

    //Create user
    let response = await server.post("/api/user").set("x-access-token", adminAccessToken).send({});

    expect(response.status).to.equal(400);
    expect(response.body.error).to.equal(true);
    expect(response.body.message).to.equal('Please provide all required fields!');
  });

  it("User Create - Success! User has been created.", async () => {     
    const response = await server.post("/api/user").set("x-access-token", adminAccessToken).send(user);

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal("Record created successfully!");

    newlyCreatedUserId = response.body.data;
  });


  //===============================================================================================
  //Update User Api  
  //===============================================================================================
  var updatedUser = {    
    FirstName: `demouser${randomNumber}`,
    LastName: `demouser${randomNumber}`,
    Email: `demouser${randomNumber}@abc.com`
  }

  it("User Update - Falied! Unauthenticated user can not perform this action.", async () => { 
    let response = await server.put(`/api/user/${newlyCreatedUserId}`).send(updatedUser);

    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal(true);
    expect(response.body.message).to.equal('No access token available!');
  });

  it("User Update - Falied! Invalid access token to perform this action.", async () => { 
    let response = await server.put(`/api/user/${newlyCreatedUserId}`).set("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eysdfsffdfsdfsdf").send(updatedUser);

    expect(response.status).to.equal(401);
    expect(response.body.error).to.equal(true);
    expect(response.body.message).to.equal('Invalid/Expired access token!');
  });

  it("User Update - Falied! Required all mandatory fields.", async () => { 
    let response = await server.put(`/api/user/${newlyCreatedUserId}`).set("x-access-token", userAccessToken).send({});

    expect(response.status).to.equal(400);
    expect(response.body.error).to.equal(true);
    expect(response.body.message).to.equal('Please provide all required fields!');
  });

  it("User Update - Success! User has been updated using User access token.", async () => {     
    const response = await server.put(`/api/user/${newlyCreatedUserId}`).set("x-access-token", userAccessToken).send(updatedUser);

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal("Record updated successfully!");
  });

  it("User Update - Success! User has been updated using Admin access token.", async () => {    
    //Change the value just for testing purpose.
    updatedUser = {    
        FirstName: `demoadmin${randomNumber}`,
        LastName: `demoadmin${randomNumber}`,
        Email: `demoadmin${randomNumber}@abc.com`
    }

    const response = await server.put(`/api/user/${newlyCreatedUserId}`).set("x-access-token", adminAccessToken).send(updatedUser);

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal("Record updated successfully!");
  });

  //===============================================================================================
  //Get User Api  
  //===============================================================================================
  //Get All
  it("User View All - Falied! Unauthenticated user can not perform this action.", async () => { 
    let response = await server.get(`/api/user`);

    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal(true);
    expect(response.body.message).to.equal('No access token available!');
  });

  it("User View All - Falied! Invalid access token to perform this action.", async () => { 
    let response = await server.get(`/api/user`).set("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eysdfsffdfsdfsdf");

    expect(response.status).to.equal(401);
    expect(response.body.error).to.equal(true);
    expect(response.body.message).to.equal('Invalid/Expired access token!');
  });

  it("User View All - Falied! Authenticated user but not having admin priviledge to perform this action.", async () => {
    const response = await server.get(`/api/user`).set("x-access-token", userAccessToken);

    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal(true);
    expect(response.body.message).to.equal('You are not having admin priviledge to perform this action!');
  });

  it("User View All - Success! Users has been retrived.", async () => { 
    const response = await server.get(`/api/user`).set("x-access-token", adminAccessToken);

    expect(response.status).to.equal(200);
    expect(response.body.error).to.equal(false);        
    expect(response.body.data).to.be.a('array');
    expect(response.body.data.length).to.be.greaterThan(0);
  });

  //GetById
  it("User View By Id - Falied! Unauthenticated user can not perform this action.", async () => { 
    let response = await server.get(`/api/user/${newlyCreatedUserId}`);

    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal(true);
    expect(response.body.message).to.equal('No access token available!');
  });

  it("User View By Id - Falied! Invalid access token to perform this action.", async () => { 
    let response = await server.get(`/api/user/${newlyCreatedUserId}`).set("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eysdfsffdfsdfsdf");

    expect(response.status).to.equal(401);
    expect(response.body.error).to.equal(true);
    expect(response.body.message).to.equal('Invalid/Expired access token!');
  });

  it("User View By Id - Success! User has been retrived using User access token.", async () => {     
    const response = await server.get(`/api/user/${newlyCreatedUserId}`).set("x-access-token", userAccessToken);

    expect(response.status).to.equal(200);
    expect(response.body.error).to.equal(false);        
    expect(response.body.data).to.be.a('array');
    expect(response.body.data.length).to.be.greaterThan(0);
  });

  it("User View By Id - Success! User has been retrived using Admin access token.", async () => {     
    const response = await server.get(`/api/user/${newlyCreatedUserId}`).set("x-access-token", adminAccessToken);

    expect(response.status).to.equal(200);
    expect(response.body.error).to.equal(false);        
    expect(response.body.data).to.be.a('array');
    expect(response.body.data.length).to.be.greaterThan(0);
  });

});

//===============================================================================================
//Final Operations  
//===============================================================================================
describe("FinalOperations", () => {    
  it("User Delete - Falied! Unauthenticated user can not perform this action.", async () => { 
    let response = await server.delete(`/api/user/${newlyCreatedUserId}`);

    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal(true);
    expect(response.body.message).to.equal('No access token available!');
  });

  it("User Delete - Falied! Invalid access token to perform this action.", async () => { 
    let response = await server.delete(`/api/user/${newlyCreatedUserId}`).set("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eysdfsffdfsdfsdf");

    expect(response.status).to.equal(401);
    expect(response.body.error).to.equal(true);
    expect(response.body.message).to.equal('Invalid/Expired access token!');
  });

  it("User Delete - Falied! Authenticated user but not having admin priviledge to perform this action.", async () => {     
    const response = await server.delete(`/api/user/${newlyCreatedUserId}`).set("x-access-token", userAccessToken);

    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal(true);
    expect(response.body.message).to.equal('You are not having admin priviledge to perform this action!');
  }); 
  
  it("User Delete - Success! User has been deleted.", async () => {     
    const response = await server.delete(`/api/user/${newlyCreatedUserId}`).set("x-access-token", adminAccessToken);

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal("Record deleted successfully!");
  });
});