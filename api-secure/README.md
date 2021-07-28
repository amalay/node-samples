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
#### A. SignIn Api to get Access token
##### 1. POST: http://localhost:5000/api/auth/signIn
This is the signIn api and will be accessed by any user to get Access token!
###### Payload:
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
###### Payload:
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
###### Payload:
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
###### Payload:
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

#### B. Authentication & Authorization Demo
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
###### Payload:
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

##### 2. GET: http://localhost:5000/api/auth/user
This is the user dashboard api and will be accessed by only authenticated user. Authentication/Authorization and Access token are required to access this api!
###### Payload:
```json
Not Required
```

###### Authentication Header:
Generate token for normal user using SignIn Api mentioned above and pass it in the request header as below:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI2MjczNDYxLCJleHAiOjE2MjYzNTk4NjF9.tbsfxdMrwn2fYAMQNDZR7eHix-vhyhdwyxII3yj20_I"
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```