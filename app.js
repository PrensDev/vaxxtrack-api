/**
* ================================================================
* * APP CONFIGURATIONS
* ================================================================
*/

// Import required modules or packages
const express = require('express');
const jwt     = require('jsonwebtoken');
const cors    = require('cors');


// Reference to database models
const db = require('./models');


// Creating an instance of express
const app = express();


// Initialize dotenv config
require('dotenv').config();


// Port Configuration
const PORT = process.env.PORT || 3333;


// Express Setups
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Middlewares
app.use(cors());
app.use((req, res, next) => {

    // Log request messages (testing purposes)
    if(process.env.ENABLE_REQUEST_LOGS === 'true') console.log(`Request has been sent to ${ req.url }`);
    next();
});


// Generate Secret Token (testing purposes)
// secret_token = require('crypto').randomBytes(64).toString("hex");


// Authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    // If token is null then send unauthorized response
    if (token == null) return res.status(401).send('No access token is detected.');
    
    // Verify the token, if not verified then forbidden
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {

        // If token is not verified then send forbidden response
        if (err) return res.sendStatus(403);

        // Save token data to req.user
        req.user = user;
        next();
    });
}


/**
* ================================================================
* * ROUTES
* ================================================================
*/

// API Controller
const API_CONTROLLER = '/c19ctavms/v1/';

// Home Route
app.use(`${ API_CONTROLLER }`, require('./routes/home.route'));

// Test Route (this will be removed before production)
app.use(`${ API_CONTROLLER }test`, require('./routes/test.route'));

// Authenticated Routes
app.use(`${ API_CONTROLLER }citizen`         , authenticateToken , require('./routes/citizen.route'));
app.use(`${ API_CONTROLLER }representative`  , authenticateToken , require('./routes/representative.route'));
app.use(`${ API_CONTROLLER }health-official` , authenticateToken , require('./routes/health_official.route'));
app.use(`${ API_CONTROLLER }super-admin`     , authenticateToken , require('./routes/super_admin.route'));


/**
* ================================================================
* * DATABASE CONFIGURATIONS
* ================================================================
*/


// Database Connection Messages
const connSuccessMsg = `
=========================================================================
SUCCESSFULLY CONNECTED TO THE DATABASE!
-------------------------------------------------------------------------
Execution is in process... Please wait...
=========================================================================
`

const connFailedMsg = (err) => { return `
=========================================================================
FAILED TO CONNECT TO THE DATABASE!
-------------------------------------------------------------------------
${ err }
=========================================================================

Have you already done the following?
- Open XAMPP and start Apache and MySql
- Create database
    > $ sequelize db:create

If yes and still cannot connect to the database, 
please message your lead developer immediately.
`
}

// Sequelize Sync Messages 
const syncSuccessMsg = `
=========================================================================
Execution is successful!
-------------------------------------------------------------------------
Base URL: http://localhost:${ PORT }/c19ctavms/v1/
=========================================================================
`

const syncFailedMsg = (err) => {
return `
=========================================================================
Execution failed... Try to seek bugs and errors!
-------------------------------------------------------------------------
${err}
=========================================================================
`
}

// Test if connected to the database
db.sequelize
    .authenticate()
    .then(() => {
        
        // Log the success connection message (testing purposes) 
        if(process.env.ENABLE_DB_CONN_LOGS === 'true' || false) console.log(connSuccessMsg)
        
        // Synchronize models and save changes to database
        db.sequelize
            .sync({
                force: process.env.SEQUELIZE_FORCE_SYNC === 'true' || false,
                alter: process.env.SEQUELIZE_ALTER_SYNC === 'true' || false,
                sync:  process.env.SEQUELIZE_ALLOW_SYNC === 'true' || false,
            })
            .then(() => app.listen(PORT, () => console.log(syncSuccessMsg)))
            .catch((err) => console.log(syncFailedMsg(err)));
    })
    .catch((err) => console.log(connFailedMsg(err)));