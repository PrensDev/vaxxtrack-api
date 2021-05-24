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

exports.populate = (req, res, next) => {
    
    // Register Super Admin
    db.Users.create({
        user_ID: 'e2348fa2-420f-461d-b580-cd94be442dc9',
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
            user_ID: 'bff36b50-3559-45e0-b418-d7018cfaea19',
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
        console.log('==> A Super Admin has been registered.\n');
    });

    // Register Citizen
    db.Addresses.create({
        address_ID: '7003cc64-1c01-4314-b8a5-ebd77db6867b',
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
            user_ID: 'b9d2fa7e-8809-46fa-af83-f872044b8444',
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
        console.log('==> A citizen has been registered.\n');

        // Health Status Log
        db.Health_Status_Logs.create({
            health_status_log_ID: 'b9a17c89-47e3-4eab-9d2e-72627142180a',
            citizen_ID: 'b9d2fa7e-8809-46fa-af83-f872044b8444',
            temperature: 35.7,
            fever: false,
            dry_cough: false,
            sore_throat: false,
            breath_shortness: false,
            smell_taste_loss: false,
            fatigue: false,
            aches_pain: false,
            runny_nose: false,
            diarrhea: false,
            headache: false,
        })
        .then(() => {
            console.log('==> A health status log has been logged.\n');
        })
        .catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });

    // Register Another Citizen
    db.Addresses.create({
        address_ID: '7452024c-02a6-407c-903d-0737bb50debb',
        region: 'NATIONAL CAPITAL REGION',
        province: 'Metro Manila',
        city_municipality: 'Paranaque City',
        baranggay_district: 'Paranaque',
        street: 'Kalibo',
        specific_location: '234 Nawawala Road',
        zip_code: 1532,
        latitude: 189.93,
        longitude: 154.23,
        user: [{
            user_ID: '5ae995ba-94be-408a-a8c3-eb1d42dc6f40',
            first_name: 'John',
            middle_name: null,
            last_name: 'Doe',
            sex: 'Biologically Male',
            birth_date: '1983-01-01',
            user_type: 'Citizen',
            password: '$P@ssw0rd;',
            user_accounts: [{
                details: 'johndoe@gmail.com',
                type: 'Email',
                verified: 1,
            }],
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
        console.log('==> A citizen has been registered.\n');

        // Health Status Log
        db.Health_Status_Logs.create({
            health_status_log_ID: '8516c061-461f-4a26-8ec4-40fe17a514c4',
            citizen_ID: '5ae995ba-94be-408a-a8c3-eb1d42dc6f40',
            temperature: 36.1,
            fever: false,
            dry_cough: false,
            sore_throat: false,
            breath_shortness: false,
            smell_taste_loss: false,
            fatigue: false,
            aches_pain: false,
            runny_nose: false,
            diarrhea: false,
            headache: false,
        })
        .then(() => {
            console.log('==> A health status log has been logged.\n');
        })
        .catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });

    // Register Representative
    db.Users.create({
        user_ID: 'f9015dc2-9ba4-412c-a2c6-d7b7ed113198',
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
            establishment_ID: 'a48e2b18-e7a6-4a0f-b1e5-ead46072c666',
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
                role_ID: '049977f3-a6bd-4653-a0b3-61eab76feacc',
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
        console.log('==> A representative has been registered.\n');

        // Visiting Log
        db.Visiting_Logs.create({
            visiting_log_ID: '6402b2c0-18ab-4c62-a786-9b4c86c14b59',
            citizen_ID: '5ae995ba-94be-408a-a8c3-eb1d42dc6f40',
            establishment_ID: 'a48e2b18-e7a6-4a0f-b1e5-ead46072c666',
            temperature: 36.1,
            health_status_log_ID: '8516c061-461f-4a26-8ec4-40fe17a514c4',
            purpose: 'Visiting'
        })
        .then(() => {
            console.log('==> A visiting log has been recorded.\n');
        })
        .catch((err) => {
            console.log(err);
        });
    })
    .catch((err) => {
        console.log(err);
    });

    // Register Representative
    db.Users.create({
        user_ID: '1d069520-3600-4157-87ed-e55e2a2ca8b1',
        first_name: "Andrea",
        last_name: "Luzviminda",
        user_type: "Representative",
        password:  "$P@ssw0rd;",
        user_accounts: [{
            "details": "andrea123@gmail.com",
            "type": "Email",
            "verified": true
        }],
        establishments_with_roles: [{
            name: "ABC Company",
            type: "Company",
            address: {
                region: "NATIONAL CAPITAL REGION",
                province: "Metro Manila",
                city_municipality: "Makati City",
                baranggay_district: "Mahapdi",
                street: "Sinugatan",
                specific_location: "535 Masakit Road",
                zip_code: "1111",
                latitude: "134.66",
                longitude: "200.20",
            },
            Roles: [{
                role_ID: 'dfe728fc-1ae0-4f5d-b544-9e004eb458fb',
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
        console.log('==> A representative has been registered.\n');
    })
    .catch((err) => {
        console.log(err);
    });
}