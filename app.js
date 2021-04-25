// Import modules or packages
const express   = require('express');
const dotenv    = require('dotenv');


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


// Routes
// const sampleRoute = require('./routes/sample.route');
// app.use('/', sampleRoute);


// Test if connected to the database
db.sequelize
    .authenticate()
    .then(() => {
        console.log('Successfully connected to the database');
    })
    .catch((err) => {
        console.log('Failed to connect to the database');
    });


// Save changes to the database
db.sequelize
    .sync({ alter: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`Listening on http://localhost:${ port }`);
        });
    });
