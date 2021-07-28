# Test automation fro the APIs in NodeJS with testing framework Mocha, Chai and Supertest

## Learnig steps


### Code setup from github

1. Setup MYSQL Database at your local machine if not setup already.
2. Open MYSQL shell or command prompt and run the scripts mentioned in mySqlScripts.sql file under project folder.
3. Clone the project from github
4. Set your MySql connection settings into config.js file under config folder
5. Run npm install command on your terminal to install the required packages.
6. Run npm start command on your terminal to start the application
7. Open postman and execute APIs with payload mentioned as below. 
8. To execute the test cases defined in test.js file under test folder of the project, you have to open another terminal while keep running the first terminal mentioned in 6.
9. On the new terminal run the commad "mocha". It will run all the test cases and you can see the results on the same terminal.


### Required packages and commands to install
> npm install express --save-dev
> npm install mysql --save-dev
> npm install nodemon --save-dev
> npm install body-parser --save-dev
> npm install bcryptjs
> npm install jsonwebtoken

> npm install --save-dev chai
> npm install --save-dev chai-http 
> npm install -g mocha --save-dev
> npm install --save-dev supertest
> npm install --save-dev should
