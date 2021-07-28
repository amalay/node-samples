# Secure Api in NodeJS with JWT Token and MySql

## Learnig steps


### Code setup from github

1. Setup MYSQL Database at your local machine if not setup already.
2. Open MYSQL shell or command prompt and run the scripts mentioned in mySqlScripts.sql file under project folder.
3. Clone the project from github
4. Set your MySql connection settings into config.js file under config folder
5. Run npm install command on your terminal to install the required packages.
6. Run npm start command on your terminal to start the application
7. Open postman and execute APIs with payload mentioned as below. 


### Required packages and commands to install
> npm install express --save-dev

> npm install mysql --save-dev

> npm install nodemon --save-dev

> npm install body-parser --save-dev

> npm install bcryptjs

> npm install jsonwebtoken

### Sample Request and Response
#### A. SignIn API to get Access token
##### 1. POST: http://localhost:5000/api/auth/signIn
This is the signIn api and will be accessed by any user to get Access token!
###### Payload: Invalid UserName in payload
```json
{
    "UserName": "test",
    "Password": "test"
}
```

###### Authentication Header:
```json
Not Required
```

###### Response:
```json
{
    "error": true,
    "accessToken": null,
    "message": "User not found!"
}
```

###### OR
###### Payload: Invalid Password in payload
```json
{
    "UserName": "user",
    "Password": "xxxxx"
}
```

###### Authentication Header:
```json
Not Required
```

###### Response:
```json
{
    "error": true,
    "accessToken": null,
    "message": "Invalid password!"
}
```

###### OR
###### Payload: Valid UserName and Password in payload with User Role
```json
{
    "UserName": "user",
    "Password": "user"
}
```

###### Authentication Header:
```json
Not Required
```

###### Response:
```json
{
    "id": 2,
    "userName": "user",
    "email": "user@abc.com",
    "roleId": 2,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4",
    "message": "User signed in successfully!",
    "error": false
}
```

###### OR
###### Payload: Valid UserName and Password in payload with Admin Role
```json
{
    "UserName": "admin",
    "Password": "admin"
}
```

###### Authentication Header:
```json
Not Required
```

###### Response:
```json
{
    "id": 1,
    "userName": "admin",
    "email": "admin@abc.com",
    "roleId": 1,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q",
    "message": "User signed in successfully!",
    "error": false
}
```

#### B. Authentication & Authorization APIs
##### 1. GET: http://localhost:5000/api/auth/default
This is the default api and will be accessed by any user. Authentication/Authorization or Access token is not required to access this api!
###### Payload:
```json
Not Required
```

###### Authentication Header:
```json
Not Required
```

###### Response:
```json
{
    "error": false,
    "message": "Default page! It is accessible by all users."
}
```

##### 2. GET: http://localhost:5000/api/auth/user
This is the user dashboard api and will be accessed by only authenticated user. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
Not Required
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User Access token in request header
```json
Not Required
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": false,
    "message": "User Dashboard page! It is accessible by all authenticated users."
}
```

##### 3. GET: http://localhost:5000/api/auth/admin
This is the admin dashboard api and will be accessed by only authenticated user having Admin role. Authentication/Authorization and Access token are required to access this api!
###### Payload: With User Access token in request header
```json
Not Required
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": true,
    "message": "You are not having admin priviledge to perform this action!"
}
```

###### OR
###### Payload: With Admin Access token in request header
```json
Not Required
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
{
    "error": false,
    "message": "Admin Dashboard page! It is accessible only by authenticated users who has Admin role."
}
```

#### C. User APIs
##### 1. POST: http://localhost:5000/api/user
This is the User API and will be accessed by only authenticated user having Admin role. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
{
    "UserName": "test",
    "Password": "test",
    "FirstName": "test",
    "LastName": "test",
    "Email": "test@abc.com"
}
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User Access token in request header
```json
{
    "UserName": "test",
    "Password": "test",
    "FirstName": "test",
    "LastName": "test",
    "Email": "test@abc.com"
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": true,
    "message": "You are not having admin priviledge to perform this action!"
}
```

###### OR
###### Payload: With Admin Access token in request header
```json
{
    "UserName": "test",
    "Password": "test",
    "FirstName": "test",
    "LastName": "test",
    "Email": "test@abc.com"
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
{
    "error": false,
    "message": "Record created successfully!",
    "data": 44
}
```

##### 2. PUT: http://localhost:5000/api/user/44
This is the User API and will be accessed by only authenticated user. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
{    
    "FirstName": "test12",
    "LastName": "test12",
    "Email": "test12@abc.com"
}
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User Access token in request header
```json
{    
    "FirstName": "test12",
    "LastName": "test12",
    "Email": "test12@abc.com"
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": false,
    "message": "Record updated successfully!"
}
```

###### OR
###### Payload: With Admin Access token in request header
```json
{    
    "FirstName": "test1234",
    "LastName": "test1234",
    "Email": "test1234@abc.com"
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
{
    "error": false,
    "message": "Record updated successfully!"
}
```