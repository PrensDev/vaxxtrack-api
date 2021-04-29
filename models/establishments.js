'use strict';

const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Establishments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  Establishments.init({
    
    // Model Attributes
  
    column: DataTypes.STRING
    
  }, {

    // Model Options

    sequelize,
    modelName: 'Establishments',
  });

  return Establishments;
};