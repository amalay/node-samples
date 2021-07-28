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
#### Authentication & Authorization Demo
##### 1. GET: http://localhost:5000/api/auth/default
This is the default api and will be accessed by any user. No authentication/authorization or token is required!
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
