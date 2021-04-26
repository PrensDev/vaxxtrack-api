'use strict';
const { Sequelize, Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vaccination_Records extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Vaccination_Records.init({
    vaccination_record__ID: {
      type          : DataTypes.UUID,
      defaultValue  : Sequelize.UUIDV4,
      primaryKey    : true,
      allowNull     : false,
      validate      :{
        notNull:  {
          msg: 'this field cannot be null',
        }
      },
      comment       : 'This contains the unique identifiers for each record on this table'
    },
    
    citizen_ID:   {
      type          : DataTypes.UUID,
      allowNull     : false,
      validate      : {
        notNull:  'Citizen ID must not be null'
      },
      references    : {
        model:  {
          tableName:  'citizens'
        },
      key: 'citizen_ID'
      },
      comment       : 'this contains the unique identifiers for each citizen record'
    },

    vaccine_ID:   {
      type          :DataTypes.UUID,
      allowNull     : false,
      
    }


  }, {
    sequelize,
    freezeTableName : true,
    modelName : 'Vaccination_Records',
    timestamp : true,
    createdAt : 'created_datetime',
    updatedAt : 'updated_datetime',
    
  });
  return Vaccination_Records;
};