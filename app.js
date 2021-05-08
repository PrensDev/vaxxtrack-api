// Import modules or packages
const express = require('express');
const jwt = require('jsonwebtoken');

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


// Middleware
app.use((req, res, next) => {
    console.log(`Request has been sent to ${ req.url }`);
    next();
});


// Generate Secret Token (testing purposes)
// secret_token = require('crypto').randomBytes(64).toString("hex");


// Authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    // Check if token is null then unauthorized
    if (token == null) return res.sendStatus(401);
    
    // Verify the token, if not verified then forbidden
    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}


// Main Routes
app.use('/', require('./routes/main.route'));

// Authenticated Routes
app.use('/citizen', require('./routes/citizen.route'));
app.use('/representative', authenticateToken, require('./routes/representative.route'));
app.use('/test', require('./routes/test.route'));


// Database Connection Messages
const connSuccessMsg = `
=========================================================================
SUCCESSFULLY CONNECTED TO THE DATABASE!
=========================================================================
`

const connFailedMsg = `
=========================================================================
FAILED TO CONNECT TO THE DATABASE!
-------------------------------------------------------------------------
Have you already done the following?
- Open XAMPP and start Apache and MySql
- Create database
    > $ sequelize db:create

If yes and still cannot connect to the database, 
please message your lead developer immediately.
=========================================================================
`

// Test if connected to the database
db.sequelize
    .authenticate()
    .then(() => {
        console.log(connSuccessMsg);
    })
    .catch((err) => {
        console.log(connFailedMsg);
    });


// Sequelize Sync Messages 
const syncSuccessMsg = `
=========================================================================
Execution is successful!
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

// Save changes to the database
db.sequelize
    .sync({
        force: process.env.SEQUELIZE_FORCE_SYNC || true,
        sync: process.env.SEQUELIZE_ALLOW_SYNC || false,
    })
    .then(() => {

        // Register Super Admin
        db.Users.create({
            first_name: 'Jetsun Prince',
            middle_name: 'Padrogane',
            last_name: 'Torres',
            user_type: 'Super Admin',
            password: '$P@ssw0rd_ADMIN;',
            user_accounts: [{
                details: 'jetsunprincetorres@gmail.com',
                type: 'Email',
                verified: 1
            }],
            health_officials: [{
                first_name: 'Anne',
                middle_name: '',
                last_name: 'Yang',
                user_type: 'Health Official',
                password: '$P@ssw0rd;',
                user_accounts: [{
                    details: 'anneyang@gmail.com',
                    type: 'Email',
                    verified: 1
                }]
            }]
        }, {
            include: [{
                model: db.User_Accounts,
                as: 'user_accounts',
            }, {
                model: db.Users,
                as: 'health_officials',
                include: [{
                    model: db.User_Accounts,
                    as: 'user_accounts',
                }]
            }]
        }).then(() => {
            console.log('\n==> A Super Admin has been registered.\n');
        });

        // Register Citizen
        db.Addresses.create({
            region: 'NATIONAL CAPITAL REGION',
            province: 'Metro Manila',
            city_municipality: 'Valenzuela City',
            baranggay_district: 'Bignay',
            street: 'Hulo',
            specific_location: 'Block 1, Lot 1, Camella Village,',
            zip_code: 1440,
            latitude: 100,
            longitude: 100,
            user: [{
                first_name: 'Juan',
                middle_name: null,
                last_name: 'Dela Cruz',
                sex: 'Biologically Male',
                birth_date: '2000-01-01',
                user_type: 'Citizen',
                password: '$P@ssw0rd;',
                user_accounts: [{
                    details: 'juandelacruz@gmail.com',
                    type: 'Email',
                    verified: 1,
                }, {
                    details: '09123456789',
                    type: 'Contact Number',
                    verified: 0,
                }, ],
            }],
        }, {
            include: [{
                model: db.Users,
                as: 'user',
                include: [{
                    model: db.User_Accounts,
                    as: 'user_accounts',
                }]
            }]
        }).then(() => {
            console.log('\n==> A citizen has been registered.\n');
        }).catch((err) => {
            console.log(err);
        });

        // Register Representative
        db.Users.create({
            first_name: "Maria",
            last_name: "Mercedez",
            user_type: "Representative",
            password:  "$P@ssw0rd;",
            user_accounts: [{
                "details": "mariamercedez@gmail.com",
                "type": "Email",
                "verified": true
            }],
            establishments_with_roles: [{
                name: "San Crest Corporation",
                type: "Industrial",
                address: {
                    region: "NCR",
                    province: "Metro Manila",
                    city_municipality: "Caloocan City",
                    baranggay_district: "Deparo",
                    street: "Kabatuhan",
                    specific_location: "123",
                    zip_code: "1234",
                    latitude: "100",
                    longitude: "200",
                },
                Roles: [{
                    role: 'Manager',
                    isAdmin: true
                }]
            }]
        }, {
            include: [{
                model: db.User_Accounts,
                as: 'user_accounts'
            }, {
                model: db.Establishments,
                as: 'establishments_with_roles',
                include: [{
                    model: db.Addresses,
                    as: 'address'
                }]
            }]
        })
        .then(() => {
            console.log('\n==> A representative has been registered.\n');
        })
        .catch((err) => {
            console.log(err);
        });

        app.listen(port, () => {
            console.log(syncSuccessMsg);
        });
    })
    .catch((err) => {
        console.log(syncFailedMsgHeader + `Your error:\n` + err + syncFailedMsgFooter);
    });