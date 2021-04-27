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
      type :DataTypes.UUID,
      allowNull : false,
      primarykey : true,
      defualtvalue : Sequelize.UUIDV4,
      validation : {
        notNull : {
          msg: 'This Contact ID cannot be null'
        }
      },
      comment : 'This contains the unique identifiers for each record on this table'
    },
    }, {

    // Model Option

    sequelize,
    FreezeTbaleName : true,
    modelName: 'Contacts',
    Timestamps :true,
    createdAt : 'Created_datetime',
    updatedAt : 'updated_datetime',
  });
  return Contacts;
};