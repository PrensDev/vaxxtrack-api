const db = require('../../models');

// Get All Vaccines
exports.getAllVaccines = (req, res, next) => {
    if(req.user == null || req.user.user_type !== 'Super Admin') {
        res.sendStatus(403);
    } else {
        db.Vaccines
            .findAll()
            .then((data) => {
                res.send({
                    error: false,
                    data: data,
                    message: 'Vaccines had been successfully retrieved'
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

// Get One Vaccine
exports.getOneVaccine = (req, res, next) => {
    if(req.user == null || req.user.user_type !== 'Super Admin') {
        res.sendStatus(403);
    } else {
        db.Vaccines
            .findByPk(req.params.vaccine_ID)
            .then((data) => {
                if(data) {
                    res.send({
                        error: false,
                        data: data,
                        message: 'A vaccine has been identified'
                    });
                } else {
                    res.send({
                        error: true,
                        message: 'No vaccine has been identified'
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

// Update a Vaccine
exports.updateVaccine = (req, res, next) => {
    if(req.user == null || req.user.user_type !== 'Super Admin') {
        res.sendStatus(403);
    } else {

        // Check first if vaccine ID is existed in database
        db.Vaccines
            .findByPk(req.params.vaccine_ID)
            .then((result) => {
                if (result) {

                    // Update a vaccine info
                    db.Vaccines
                        .update(req.body, {
                            where: {
                                vaccine_ID: req.params.vaccine_ID
                            }
                        })
                        .then(() => {

                            // Get vaccine info
                            db.Vaccines
                                .findByPk(req.params.vaccine_ID)
                                .then((data) => {
                                    res.send({
                                        error: false,
                                        data: data,
                                        message: 'A vaccine has been successfully updated'
                                    })
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                    
                } else {
                    res.send({
                        error: true,
                        message: 'No vaccine has been identified'
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
}