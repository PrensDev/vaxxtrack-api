const { errResponse, dataResponse } = require("../../helpers/controller.helper");
const db = require("../../models");

// Get All Vaccines
exports.getAllVaccines = (req, res) => {
    db.Vaccines
        .findAll()
        .then(data => dataResponse(res, data, 'Vaccines are retrieved successfully', 'No vaccines has been retrieved'))
        .catch(err => errResponse(res, err))
}

// Get One Vaccine
exports.getOneVaccine = (req, res) => {
    db.Vaccines
        .findByPk(req.params.vaccine_ID)
        .then(data => dataResponse(res, data, 'A vaccine has been identified', 'No vaccine has been identified'))
        .catch(err => errResponse(res, err))
}