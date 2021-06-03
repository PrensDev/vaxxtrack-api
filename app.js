/*
|================================================================
| APP CONFIGURATIONS
|================================================================
*/

// Import modules or packages
const express   = require('express');
const jwt       = require('jsonwebtoken');
const cors      = require('cors');


// Reference to database
const db = require('./models');


// Creating an instance of express
const app = express();


// Initialize dotenv config
require('dotenv').config();


// Configurations
const port = process.env.PORT || 3333;


// Setups
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Middlewares
app.use(cors());
app.use((req, res, next) => {
    if(process.env.ENABLE_REQUEST_LOGS === 'true' || false) {
        console.log(`Request has been sent to ${ req.url }`);
    }
    next();
});


// Generate Secret Token (testing purposes)
// secret_token = require('crypto').randomBytes(64).toString("hex");


// Authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    // If token is null then send unauthorized response
    if (token == null) return res.sendStatus(401);
    
    // Verify the token, if not verified then forbidden
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {

        // If token is not verified then send forbidden response
        if (err) return res.sendStatus(403);

        // Save token data to req.user
        req.user = user;
        next();
    });
}


/*
|================================================================
| ROUTES
|================================================================
*/

// Main Routes
app.use('/', require('./routes/main.route'));

// Test Route (this will be removed before production)
app.use('/test', require('./routes/test.route'));

// Authenticated Routes
app.use('/citizen'        , authenticateToken , require('./routes/citizen.route'));
app.use('/representative' , authenticateToken , require('./routes/representative.route'));
app.use('/health-official', authenticateToken , require('./routes/health_official.route'));
app.use('/admin'          , authenticateToken , require('./routes/super_admin.route'));


/*
|================================================================
| DATABASE CONFIGURATIONS
|================================================================
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
Listening on http://localhost:${ port }
=========================================================================
`

const syncFailedMsgHeader = `
=========================================================================
Execution failed... Try to seek bugs and errors!

`

const syncFailedMsgFooter = `
=========================================================================
`

// Test if connected to the database
db.sequelize
    .authenticate()
    .then(() => {
        if(process.env.ENABLE_DB_CONN_LOGS === 'true' || false) console.log(connSuccessMsg)

        // Save changes to the database
        db.sequelize
            .sync({
                force: process.env.SEQUELIZE_FORCE_SYNC === 'true' || false,
                alter: process.env.SEQUELIZE_ALLOW_SYNC === 'true' || false,
                sync:  process.env.SEQUELIZE_ALLOW_SYNC === 'true' || false,
            })
            .then(() => app.listen(port, () => console.log(syncSuccessMsg)))
            .catch((err) => console.log(syncFailedMsgHeader + err + syncFailedMsgFooter));
    })
    .catch((err) => console.log(connFailedMsg(err)));