// Import modules or packages
const express   = require('express');
const dotenv    = require('dotenv');


// Reference to database
const db        = require('./models');
const user_accounts = require('./models/user_accounts');


// Creating an instance of express
const app       = express();


// Configurations
const port      = process.env.PORT || 3333;


// Initialize dotenv config
dotenv.config();


// Setups
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Middleware
app.use((req, res, next) => {
    console.log(`Request has been sent to ${ req.url }`);
    next();
});


// Routes
// const sampleRoute = require('./routes/sample.route');
// app.use('/', sampleRoute);

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
        force: true 
    })
    .then(() => {

        // Register Super Admin
        db.Users.create({
            first_name      : 'Jetsun Prince',
            middle_name     : 'Padrogane',
            last_name       : 'Torres',
            user_type       : 'Super Admin',
            password        : '$P@ssword_ADMIN;',
            user_accounts   : [
                {
                    details     : 'jetsunprincetorres@gmail.com',
                    type        : 'Email',
                    verified    : 1
                }
            ]
        }, {
            include : [{
                model   : db.User_Accounts,
                as      : 'user_accounts',
            }],
            fields: [
                'first_name',
                'middle_name',
                'last_name',
                'user_type',
                'password',
                'details',
                'type',
                'verified'
            ],
        }).then(() => {
            console.log('\n==> A Super Admin has been registered.\n');
        });

        // Register Citizen
        db.Addresses.create({
            region              : 'NATIONAL CAPITAL REGION',
            province            : 'Metro Manila',
            city_municipality   : 'Valenzuela City',
            baranggay_district  : 'Bignay',
            street              : 'Hulo',
            specific_location   : 'Block 1, Lot 1, Camella Village,',
            zip_code            : 1440,
            latitude            : 100,
            longitude           : 100,
            user                : [{
                first_name          : 'Juan',
                middle_name         : null,
                last_name           : 'Dela Cruz',
                sex                 : 'Biologically Male',
                birth_date          : '2000-01-01',
                user_type           : 'Citizen',
                password            : '$P@ssw0rd;',
                user_accounts       : [
                    {
                        details         : 'juandealcruz@gmail.com',
                        type            : 'Email',
                        verified        : 1,
                    }, {
                        details         : '09123456789',
                        type            : 'Contact Number',
                        verified        : 0,
                    },
                ],
            }],
        }, {
            include: [{
                model   : db.Users,
                as      : 'user',
                include : [{
                    model   : db.User_Accounts,
                    as      : 'user_accounts',
                }]
            }]
        }).then(() => {
            console.log('\n==> A citizen has been registered.\n');
        }).catch((err) => {
            console.log(err);
        });

        // Register Representative including its establishment
        db.Addresses.create({
            region              : 'NATIONAL CAPITAL REGION',
            province            : 'Metro Manila',
            city_municipality   : 'Caloocan City',
            baranggay_district  : 'Deparo',
            street              : 'Unknown Street',
            specific_location   : 'Unknwon Location',
            zip_code            : 1441,
            latitude            : 120,
            longitude           : 130,
            establishment       : [{
                name                : 'San Crest Factory',
                type                : 'Industrial',
                representative      : [{
                    first_name          : 'Maria',
                    middle_name         : null,
                    last_name           : 'Mercedez',
                    position            : 'Manager',
                    user_type           : 'Representative',
                    password            : '$P@ssw0rd;',
                    user_accounts       : [
                        {
                            details         : 'mariamercedez@gmail.com',
                            type            : 'Email',
                            verified        : 1,
                        },
                    ],
                }],
            }],
        }, {
            include: [{
                model   : db.Establishments,
                as      : 'establishment',
                include : [{
                    model   : db.Users,
                    as      : 'representative',
                    include : [{
                        model   : db.User_Accounts,
                        as      : 'user_accounts'
                    }]
                }]
            }]
        }).then(() => {
            console.log('\n=> A Representative has been registered\n');
        });
        
        app.listen(port, () => {
            console.log(syncSuccessMsg);
        });
    })
    .catch((err) => {
        console.log(syncFailedMsgHeader + `Your error:\n` + err + syncFailedMsgFooter);
    });
