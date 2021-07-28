# Simple API in NodeJS

## Learnig steps


### Code setup from github

1. Clone the project from github
2. Run npm install command on your terminal to install the required packages.
3. Run npm start command on your terminal to start the application
7. Open postman and execute APIs with payload mentioned as below. 


### Required packages and commands to install
> npm install express --save-dev

> npm install nodemon --save-dev

> npm install body-parser --save-dev

### Sample Request and Response
##### 1. GET: http://localhost:5000/api/test
###### Payload:
```json
Not required
```

###### Response:
```json
{
    "error": false,
    "data": [
        {
            "Id": 1,
            "FirstName": "Amalay",
            "LastName": "Verma"
        },
        {
            "Id": 2,
            "FirstName": "Test",
            "LastName": "User"
        }
    ]
}
```

##### 2. GET: http://localhost:5000/api/test/2
###### Payload:
```json
Not required
```

###### Response:
```json
{
    "error": false,
    "data": [        
        {
            "Id": 2,
            "FirstName": "Test",
            "LastName": "User"
        }
    ]
}
```
