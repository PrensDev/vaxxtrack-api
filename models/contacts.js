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

    contact_ID:
    {
      type              : DataTypes.UUID,
      allowNull         : false,
      primarykey        : true,
      defualtvalue      : Sequelize.UUIDV4,
      validation : {
        notNull : {
          msg: 'This Contact ID cannot be null'
        }
      },
      comment           : 'This contains the unique identifiers for each record on this table'
    },
    
    case_ID: 
    {
      type              : DataTypes.UUID,
      allowNull         : false,
      comment           : 'This contains the case information to identify the user'
    },

    created_datetime: 
    {
      type              : DataTypes.DATE,
      allowNull         : false,
      defaultvalue      : DataTypes.NOW,
      comment           : 'This contains the date and time that a record had been created'
    },

    updated_datetime: 
    {
      type              : DataTypes.DATE,
      allowNull         : true,
      comment           : 'This contains the date and time that a record had been edited'
    },
    }, {

    // Model Option

    sequelize,
    FreezeTbaleName     : true,
    modelName           : 'Contacts',
    Timestamps          : true,
    createdAt           : 'Created_datetime',
    updatedAt           : 'updated_datetime',
  });
  return Contacts;
};