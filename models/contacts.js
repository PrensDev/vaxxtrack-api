'use strict';
const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  
  class Contacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  Contacts.init({

    // Model attribute

    contact_ID: {
      type              : DataTypes.UUID,
      allowNull         : false,
      primaryKey        : true,
      defaultValue      : Sequelize.UUIDV4,
      comment           : 'This contains the unique identifiers for each record on this table'
    },
    
    case_ID: {
      type              : DataTypes.UUID,
      allowNull         : false,
      // TODO: please include validation with message since unnullable
      comment           : 'This contains the case information to identify the user'
    },

  }, {

    // Model Options

    sequelize,
    freezeTableName  : true,
    modelName        : 'Contacts',
    timestamps       : true,
    createdAt        : 'created_datetime',
    updatedAt        : 'updated_datetime',
  });
  
  return Contacts;
};