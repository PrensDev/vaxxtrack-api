const { errResponse, dataResponse } = require("../../helpers/controller.helper");
const db = require("../../models");

// Vaccine Options
dbVaccinesOp = {
    where: {
        is_available: 1
    },
    attributes: {
        exclude: [
            'is_available',
            'created_datetime',
            'updated_datetime'
        ]
    }
}

// Get All Vaccines
exports.getAllVaccines = (req, res) => {
    db.Vaccines
        .findAll(dbVaccinesOp)
        .then(data => dataResponse(res, data, 'Vaccines are retrieved successfully', 'No vaccines has been retrieved'))
        .catch(err => errResponse(res, err))
}

// Get One Vaccine
exports.getOneVaccine = (req, res) => {
    db.Vaccines
        .findByPk(req.params.vaccine_ID, dbVaccinesOp)
        .then(data => dataResponse(res, data, 'A vaccine has been identified', 'No vaccine has been identified'))
        .catch(err => errResponse(res, err))
}