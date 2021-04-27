'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Health_Status_Logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Health_Status_Logs.init({
    health_status_log_ID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Health_Status_Logs',
  });
  return Health_Status_Logs;
};