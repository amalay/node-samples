# Instruction
-----------------------------------------------------------------------------------------------------
1. Clone the project from github
2. Install the dependent packages
3. Set your MongoDB connection string into config.js file under config folder
4. Run the command npm start on your terminal to start the application
5. Open postman and execute APIs with payload mentioned as below. 


# Packages:
> npm install express --save-dev

> npm install mongodb --save-dev

> npm install nodemon --save-dev

> npm install body-parser --save-dev

# Sample Request and Response
1. POST: http://localhost:5000/api/mongodb/createPerson

###### Payload:
```json
{    
    "firstName": "Amalay",
    "lastName": "Verma"    
}
```

###### Response:
```json
{
    "error": false,
    "data": {
        "acknowledged": true,
        "insertedId": "60f7fdfd0cdca5dffb60a679"
    },
    "message": "Record created successfully!"
}
```

<br/>
2. POST: http://localhost:5000/api/mongodb/createPersons 

###### Payload:
```json
[
    {    
        "firstName": "Mahesh",
        "lastName": "Marthi"    
    },
    {    
        "firstName": "Rakesh",
        "lastName": "Prasad"    
    }
]
```

###### Response:
```json
{
    "error": false,
    "data": {
        "acknowledged": true,
        "insertedCount": 2,
        "insertedIds": {
            "0": "60f7fe520cdca5dffb60a67a",
            "1": "60f7fe520cdca5dffb60a67b"
        }
    },
    "message": "Record created successfully!"
}
```

<br/>
3. PUT: http://localhost:5000/api/mongodb/updatePerson 

###### Payload:
```json
{
    "searchQuery":{
        "firstName": "Test"
    },
    "data":{
        "firstName": "Test12",
        "lastName": "User12"
    }
}
```

###### OR
```json
{
    "searchQuery":{
        "_id": "60f83b42d159acb79243e005"
    },
    "data":{
        "firstName": "Test12",
        "lastName": "User12"
    }
}
```

###### Response:
```json
{
    "error": false,
    "data": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    },
    "message": "Record updated successfully!"
}
```

<br/>
4. DELETE: http://localhost:5000/api/mongodb/deletePerson

###### Payload:
```json
{
    "searchQuery":{
        "firstName": "Test"
    },
    "data":{ }
}
```

###### OR
```json
{
    "searchQuery":{
        "_id": "60f83b42d159acb79243e005"
    },
    "data":{ }
}
```

###### Response:
```json
{
    "error": false,
    "data": {
        "acknowledged": true,
        "deletedCount": 1
    },
    "message": "Record deleted successfully!"
}
```

<br/>
5. GET: http://localhost:5000/api/mongodb/getperson

###### Payload:
```json
{
    "searchQuery":{ },
    "options":{ }
}
```

###### OR
```json
{
    "searchQuery":{
        "_id": "60f82ab44d744915a732e0b2"
    },
    "options":{ }
}
```

###### OR
```json
{
    "searchQuery":{
        "firstName": "Amalay"
    },
    "options":{ }
}
```

###### OR
```json
{
    "searchQuery":{
        "firstName": "Amalay"
    },
    "options":{ 
        "sort": { "firstName": -1 },        
        "projection": { "_id": 0, "firstName": 1, "lastName": 1 }
    }
}
```

###### Response:
```json
{
    "error": false,
    "data": [
        {
            "_id": "60f7fdfd0cdca5dffb60a679",
            "firstName": "Amalay",
            "lastName": "Verma"
        },
        {
            "_id": "60f7fe520cdca5dffb60a67a",
            "firstName": "Mahesh",
            "lastName": "Marthi"
        },
        {
            "_id": "60f7fe520cdca5dffb60a67b",
            "firstName": "Rakesh",
            "lastName": "Prasad"
        }
    ]
}
```

###### OR
```json
{
    "error": false,
    "data": [
        {
            "_id": "60f82ab44d744915a732e0b2",
            "firstName": "Samik",
            "lastName": "Roy"
        }
    ]
}
```

###### OR
```json
{
    "error": false,
    "data": [
        {
            "_id": "60f7fdfd0cdca5dffb60a679",
            "firstName": "Amalay",
            "lastName": "Verma"
        }
    ]
}
```

###### OR
```json
{
    "error": false,
    "data": [
        {
            "firstName": "Amalay",
            "lastName": "Verma"
        }
    ]
}
```
