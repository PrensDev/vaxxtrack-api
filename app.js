// Import modules or packages
const express   = require('express');
const dotenv    = require('dotenv');
const jwt       = require('jsonwebtoken');


// Reference to database
const db        = require('./models');


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


// Generate Secret Token (testing purposes)
// secret_token = require('crypto').randomBytes(64).toString("hex");
secret_token = 'f4b00bca46123d5ec0ab4e8221b8a403d6e2e46a4710821b7290abd931376aa92a148dec25109c627379414a1d257bd45ef8d66e76b3637368b0859415a5b0a4';


// Authenticate token
const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    
    if (token == null) { 
        return res.sendStatus(401);
    } else {
        // Verify the token
        jwt.verify(token, secret_token, (err, user) => {
            console.log(user, err);
            if (err) {
                return res.sendStatus(403);
            } else {
                next();
            }
        });
    }
}


// Routes
const indexRouter = require('./routes/index.route');
app.use('/', indexRouter);

const citizenRouter = require('./routes/citizen.route');
app.use('/citizen', citizenRouter);

const representativeRouter = require('./routes/representative.route');
app.use('/representative', representativeRouter);


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
Secret Token: ${ secret_token }
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
        force : process.env.ALLOW_FORCE || true, 
        sync  : process.env.ALLOW_SYNC  || false, 
    })
    .then(() => {

        // Register Super Admin
        db.Users.create({
            first_name      : 'Jetsun Prince',
            middle_name     : 'Padrogane',
            last_name       : 'Torres',
            user_type       : 'Super Admin',
            password        : '$P@ssw0rd_ADMIN;',
            user_accounts   : [
                {
                    details     : 'jetsunprincetorres@gmail.com',
                    type        : 'Email',
                    verified    : 1
                }
            ],
            health_officials: [
                {
                    first_name      : 'Anne',
                    middle_name     : '',
                    last_name       : 'Yang',
                    user_type       : 'Health Official',
                    password        : '$P@ssw0rd;',
                    user_accounts   : [{
                        details     : 'anneyang@gmail.com',
                        type        : 'Email',
                        verified    : 1
                    }]
                }
            ]
        }, {
            include : [
                {
                    model   : db.User_Accounts,
                    as      : 'user_accounts',
                }, {
                    model   : db.Users,
                    as      : 'health_officials',
                    include : [{
                        model   : db.User_Accounts,
                        as      : 'user_accounts',
                    }]
                }
            ]
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
        // db.Addresses.create({
        //     region              : 'NATIONAL CAPITAL REGION',
        //     province            : 'Metro Manila',
        //     city_municipality   : 'Caloocan City',
        //     baranggay_district  : 'Deparo',
        //     street              : 'Unknown Street',
        //     specific_location   : 'Unknwon Location',
        //     zip_code            : 1441,
        //     latitude            : 120,
        //     longitude           : 130,
        //     establishment       : [{
        //         name                : 'San Crest Factory',
        //         type                : 'Industrial',
        //         representative      : [{
        //             first_name          : 'Maria',
        //             middle_name         : null,
        //             last_name           : 'Mercedez',
        //             user_type           : 'Representative',
        //             password            : '$P@ssw0rd;',
        //             user_accounts       : [
        //                 {
        //                     details         : 'mariamercedez@gmail.com',
        //                     type            : 'Email',
        //                     verified        : 1,
        //                 },
        //             ],
        //         }],
        //         representative_role : [{
        //             role    : 'Manager',
        //             isAdmin : 1
        //         }]
        //     }],
        // }, {
        //     include: [{
        //         model   : db.Establishments,
        //         as      : 'establishment',
        //         include : [{
        //             model   : db.Users,
        //             as      : 'representative',
        //             include : [{
        //                 model   : db.User_Accounts,
        //                 as      : 'user_accounts'
        //             }],
        //         }],
        //         include : [{
        //             model   : db.Users,
        //             as      : 'representative_role'
        //         }],
        //     }]
        // }).then(() => {
        //     console.log('\n==> A Representative has been registered\n');
        // }).catch((err) => {
        //     console.log(`\n==============>>>\n${ err }\n==============>>>\n`);
        // });
        
        app.listen(port, () => {
            console.log(syncSuccessMsg);
        });
    })
    .catch((err) => {
        console.log(syncFailedMsgHeader + `Your error:\n` + err + syncFailedMsgFooter);
    });
