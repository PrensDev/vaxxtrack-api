const db = require('../models');

exports.test = (req, res, next) => {
    db.Users
        .findAll()
        .then((data) => {
            res.send({
                data: data
            })
        })
}

exports.populate = () => {
    
    // Add Super Admin
    db.Users
        .create({
            user_ID: '0971a50a-de92-4603-89b2-fd03d777a893',
            first_name: 'Jetsun Prince',
            middle_name: 'Padrogane',
            last_name: 'Torres',
            user_type: 'Super Admin',
            password: '$P@ssw0rd_ADMIN;',
            user_accounts: [{
                user_account_ID: 'b192cc39-c6ad-448c-8033-19d4cc763fc9',
                details: 'jetsunprincetorres@gmail.com',
                type: 'Email',
                verified: true
            }]
        }, {
            include: [{
                model: db.User_Accounts,
                as: 'user_accounts'
            }]
        })
        .then(() => {
            console.log('==> Super Admin is added');

            // Add health official added by this super admin
            db.Users
                .create({
                    user_ID: 'ebcad302-7c12-4083-8198-4953e0c8356a',
                    first_name: 'John',
                    last_name: 'Doe',
                    user_type: 'Health Official',
                    password: '$P@ssw0rd;',
                    added_by: '0971a50a-de92-4603-89b2-fd03d777a893',
                    user_accounts: [{
                        user_account_ID: 'a4df2d4c-954f-4ce3-b02e-f7c6fe635882',
                        details: 'johndoe@gmail.com',
                        type: 'Email',
                        verified: true
                    }]
                }, {
                    include: [{
                        model: db.User_Accounts,
                        as: 'user_accounts'
                    }]
                })
                .then(() => {
                    console.log('==> Health Official has been added');
                })
                .catch((err) => {
                    console.log(err);
                });

            // Add health official added by this super admin
            db.Users
                .create({
                    user_ID: '054683e2-8001-4095-851a-f077908bc9b6',
                    first_name: 'Jane',
                    last_name: 'Doe',
                    user_type: 'Health Official',
                    password: '$P@ssw0rd;',
                    added_by: '0971a50a-de92-4603-89b2-fd03d777a893',
                    user_accounts: [{
                        user_account_ID: '3d07b126-1f5b-490d-93c2-5a2e53b2c88a',
                        details: 'janedoe01@gmail.com',
                        type: 'Email',
                        verified: true
                    }]
                }, {
                    include: [{
                        model: db.User_Accounts,
                        as: 'user_accounts'
                    }]
                })
                .then(() => {
                    console.log('==> Health Official has been added');
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });

        // Register Representative
        db.Users
            .create({
                user_ID: 'c0762c69-78e9-4656-8b79-1a6bebd0358a',
                first_name: 'Timothy',
                middle_name: 'Dave',
                last_name: 'McDuffy',
                user_type: 'Representative',
                password: '$P@ssw0rd;',
                user_accounts: [{
                    user_account_ID: '322fa011-5017-4edf-85bc-f9bb1e43e910',
                    details: 'timothy.mcduffy@gmail.com',
                    type: 'Email',
                    verified: true,
                }],
                establishments_with_roles: [{
                    establishment_ID: '73cedc92-5152-4535-9f24-4f3160e2e358',
                    name: 'ABC Company',
                    type: 'Company',
                    address: [{
                        address_ID: '74b3ab4a-dd0a-475a-8f6c-9c9ec43d11d5',
                        region: 'NATIONAL CAPITAL REGION',
                        province: 'NCR THIRD DISTRICT',
                        city_municipality: 'City of Valenzuela',
                        barangay_district: 'Bignay',
                        street: 'Hulo',
                        specific_location: '290 Hulo Road',
                        zip_code: 1440,
                        latitude: 100.45,
                        longitude: 291.42
                    }],
                    Roles: {
                        role_ID: 'b7b3a379-e1f9-4f7d-9998-97b8d8d3f656',
                        role: 'CEO',
                        isAdmin: true
                    }
                }]
            }, {
                include: [
                    {
                        model: db.User_Accounts,
                        as: 'user_accounts',
                    }, {
                        model: db.Establishments,
                        as: 'establishments_with_roles',
                        include: [{
                            model: db.Addresses,
                            as: 'address'
                        }]
                    }
                ]
            })
            .then(() => {
                console.log('==> A representative has been registered');
            })
            .catch((err) => {
                console.log(err);
            });
    
        // Register Representative
        db.Users
            .create({
                user_ID: '0d9af050-1ee9-41b6-be8f-114c4fa3855b',
                first_name: 'Peter',
                last_name: 'Everson',
                user_type: 'Representative',
                password: '$P@ssw0rd;',
                user_accounts: [{
                    user_account_ID: 'ee4b34bd-18cc-472b-8315-09cee8d1d163',
                    details: 'peter.everson@gmail.com',
                    type: 'Email',
                    verified: true,
                }],
                establishments_with_roles: [{
                    establishment_ID: 'aedec51e-2c46-4ead-8348-9721a1c32f5c',
                    name: 'San Roque Supermarket',
                    type: 'Business',
                    address: [{
                        address_ID: '5a125582-845c-4787-b74b-5f9820e31e34',
                        region: 'NATIONAL CAPITAL REGION',
                        province: 'NCR THIRD DISTRICT',
                        city_municipality: 'City of Caloocan',
                        barangay_district: 'Deparo',
                        street: 'Kabatuhan',
                        specific_location: '124 Kabatuhan Road',
                        zip_code: 1447,
                        latitude: 123.65,
                        longitude: 241.12
                    }],
                    Roles: {
                        role_ID: '1adbabe9-0f36-4396-a35f-9c7843f3c3f5',
                        role: 'Manager',
                        isAdmin: true
                    }
                }]
            }, {
                include: [
                    {
                        model: db.User_Accounts,
                        as: 'user_accounts',
                    }, {
                        model: db.Establishments,
                        as: 'establishments_with_roles',
                        include: [{
                            model: db.Addresses,
                            as: 'address'
                        }]
                    }
                ]
            })
            .then(() => {
                console.log('==> A representative has been registered');
            })
            .catch((err) => {
                console.log(err);
            });
    
    // Register Citizen
    db.Users
        .create({
            user_ID: '220ff9d5-4de3-4d58-bf91-968bb129b2fa',
            first_name: 'Juan',
            middle_name: 'Dela',
            last_name: 'Cruz',
            sex: 'Male',
            birth_date: '2000-01-01',
            civil_status: 'Single',
            user_type: 'Citizen',
            password: '$P@ssw0rd;',
            user_accounts: [
                {
                    details: 'juandelacruz@gmail.com',
                    type: 'Email',
                    verified: true
                }, {
                    user_account_ID: 'b482155f-d977-4612-ab3b-5396a33f3a18',
                    details: '09123456789',
                    type: 'Contact Number',
                    verified: true
                }
            ],
            address: [{
                address_ID: '5db574ac-b2da-41e8-95c3-d1813557aa5d',
                region: 'NATIONAL CAPITAL REGION',
                province: 'NCR SECOND DISTRICT',
                city_municipality: 'City of Quezon',
                barangay_district: 'Don Fabian',
                street: 'Gitna St.',
                specific_location: 'Blk 1 Lot 2, Amore Subdivision',
                zip_code: 1443,
                latitude: 253.86,
                longitude: 248.02
            }]
        }, {
            include: [
                {
                    model: db.User_Accounts,
                    as: 'user_accounts'
                }, {
                    model: db.Addresses,
                    as: 'address'
                }
            ]
        })
        .then(() => {
            console.log('==> A Citizen has been registered');

            // Add Health Status Log
            db.Health_Status_Logs
                .create({
                    health_status_log_ID: '2a8e8a7d-224d-4d74-b855-85d3665a4bb7',
                    citizen_ID: '220ff9d5-4de3-4d58-bf91-968bb129b2fa',
                    temperature: 36.5,
                    fever: false,
                    dry_cough: false,
                    sore_throat: false,
                    breath_shortness: false,
                    smell_taste_loss: false,
                    fatigue: false,
                    aches_pain: false,
                    runny_nose: false,
                    diarrhea: false,
                    headache: false
                })
                .then(() => {
                    console.log('==> A health status log has been recorded');

                    // Add Visiting Log
                    db.Visiting_Logs
                        .create({
                            visiting_log_ID: 'fa0fba0d-592b-4368-8ef3-15381b43eb43',
                            citizen_ID: '220ff9d5-4de3-4d58-bf91-968bb129b2fa',
                            establishment_ID: 'aedec51e-2c46-4ead-8348-9721a1c32f5c',
                            temperature: 36.8,
                            health_status_log_ID: '2a8e8a7d-224d-4d74-b855-85d3665a4bb7',
                            purpose: 'Visiting'
                        })
                        .then(() => {
                            console.log('==> A visiting log has been recorded');
                        })
                        .catch((err) => {
                            console.log(err);
                        })

                    // Add Visiting Log
                    db.Visiting_Logs
                        .create({
                            visiting_log_ID: '9ca9c940-a610-4f04-960c-5fbb8ac6e587',
                            citizen_ID: '220ff9d5-4de3-4d58-bf91-968bb129b2fa',
                            establishment_ID: '73cedc92-5152-4535-9f24-4f3160e2e358',
                            temperature: 36.4,
                            health_status_log_ID: '2a8e8a7d-224d-4d74-b855-85d3665a4bb7',
                            purpose: 'Visiting'
                        })
                        .then(() => {
                            console.log('==> A visiting log has been recorded');
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });

    // Register Another Citizen
    db.Users
        .create({
            user_ID: '211c9f7f-286f-4201-b7ac-2ce5e13dbda7',
            first_name: 'Maria',
            middle_name: 'Dela Paz',
            last_name: 'Mercedez',
            sex: 'Female',
            birth_date: '2000-01-01',
            civil_status: 'Married',
            user_type: 'Citizen',
            password: '$P@ssw0rd;',
            user_accounts: [{
                user_account_ID: '8095115b-255b-4cc2-82f4-9f6e420f67df',
                details: 'mariamercedez@gmail.com',
                type: 'Email',
                verified: true
            }],
            address: [{
                address_ID: '41dff44a-a7fd-430b-8f06-c878ab226a8f',
                region: 'NATIONAL CAPITAL REGION',
                province: 'NCR SECOND DISTRICT',
                city_municipality: 'City of Quezon',
                barangay_district: 'Commonwealth',
                street: 'Don Fabian',
                specific_location: 'Blk 1 Lot 2, Amore Subdivision',
                zip_code: 1234,
                latitude: 223.86,
                longitude: 138.02
            }]
        }, {
            include: [
                {
                    model: db.User_Accounts,
                    as: 'user_accounts'
                }, {
                    model: db.Addresses,
                    as: 'address'
                }
            ]
        })
        .then(() => {
            console.log('==> A Citizen has been registered');

            // Add Health Status Log
            db.Health_Status_Logs
                .create({
                    health_status_log_ID: '0df1b48c-8fc7-4329-aea8-2a0a91ebe902',
                    citizen_ID: '211c9f7f-286f-4201-b7ac-2ce5e13dbda7',
                    temperature: 35.9,
                    fever: false,
                    dry_cough: false,
                    sore_throat: false,
                    breath_shortness: false,
                    smell_taste_loss: false,
                    fatigue: false,
                    aches_pain: false,
                    runny_nose: false,
                    diarrhea: false,
                    headache: false
                })
                .then(() => {
                    console.log('==> A health status log has been recorded');

                    // Add Visiting Log
                    db.Visiting_Logs
                        .create({
                            visiting_log_ID: '47490e20-ea55-47df-8a8e-bd0c416965e1',
                            citizen_ID: '211c9f7f-286f-4201-b7ac-2ce5e13dbda7',
                            establishment_ID: '73cedc92-5152-4535-9f24-4f3160e2e358',
                            temperature: 36.1,
                            health_status_log_ID: '0df1b48c-8fc7-4329-aea8-2a0a91ebe902',
                            purpose: 'Visiting'
                        })
                        .then(() => {
                            console.log('==> A visiting log has been recorded');
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
}