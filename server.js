/* *********************************
 * Required assets
 * *********************************/
const express = require('express');
const app = express();
const env = require('dotenv');
const dbConnection = require('./Models/ConnectDB.js')

/* **********************************
 * DotEnv configuration
 * **********************************/
env.config()

/* **********************************
 * Routes
 * **********************************/
app.use('/', require('./Routes/index.js'));


/* **********************************
 * Port server is listening to
 * **********************************/
const port = 3000;

app.listen(process.env.port || port);
console.log('Web server is listening at port ' + (process.env.port || port));

/* **********************************
 * Connect MongoDB
 * **********************************/
dbConnection.connection().catch(console.error);

// db.main()
