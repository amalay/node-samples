# CRUD Operations in NodeJS with MySql

### Instruction
-----------------------------------------------------------------------------------------------------
1. Clone the project from github
2. Install the dependent packages
3. Set your MySql connection settings into config.js file under config folder
4. Run npm install command on your terminal to install the required packages.
5. Run npm start command on your terminal to start the application
6. Open postman and execute APIs with payload mentioned as below. 


### Packages:
> npm install express --save-dev

> npm install mysql --save-dev

> npm install nodemon --save-dev

> npm install body-parser --save-dev

### Sample Request and Response
##### 1. POST: http://localhost:5000/api/mysql
###### Payload:
```json
{    
    "FirstName": "Amalay",
    "LastName": "Verma"    
}
```

###### Response:
```json
{
    "error": false,
    "message": "Record created successfully!",
    "data": 2
}
```

##### 2. PUT: http://localhost:5000/api/mysql/2
###### Payload:
```json
{    
    "FirstName": "Amalay1234",
    "LastName": "Verma1234"    
}
```

###### Response:
```json
{
    "error": false,
    "message": "Record updated successfully!"
}
```

##### 3. DELETE: http://localhost:5000/api/mysql/2
###### Payload:
```json
Not Required
```

###### Response:
```json
{
    "error": false,
    "message": "Record deleted successfully!"
}
```

##### 4. GET: http://localhost:5000/api/mysql/2
###### Payload:
```json
Not Required
```

###### Response:
```json
{
    "error": false,
    "data": [
        {
            "Id": 2,
            "FirstName": "Amalay",
            "LastName": "Verma"
        }
    ]
}
```

##### 5. GET: http://localhost:5000/api/mysql
###### Payload:
```json
Not Required
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
