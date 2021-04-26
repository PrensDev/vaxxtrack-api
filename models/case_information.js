'use strict';

const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  
  class Case_Information extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      
      // 1:1 (case_information -> citizens)
      this.hasOne(models.Citizens, {
        foreignKey: 'citizen_ID',
      }); 
    }
  };
  
  Case_Information.init({

    // Model attributes

    case_ID: {
      type          : DataTypes.UUID,
      defaultValue  : Sequelize.UUIDV4,
      primaryKey    : true,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'This field cannot be null',
        }
      },
      comment       : 'This contains the unique identifiers for each record on this table'
    },

    case_code: {
      type          : DataTypes.STRING,
      unique        : true,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'Case cannot be null'
        }
      },
      comment       : 'This contains the case code about a case information'
    },

    citizen_ID: {
      type          : DataTypes.UUID,
      allowNull     : false,
      validate      : {
        notNull: 'Citizen ID must not be null'
      },
      references    : {
        model: {
          tableName: 'citizens'
        },
        key: 'citizen_ID'
      },
      comment       : 'This links a citizen to indicate who owns a case record'
    }
  
  }, {

    // Model Options

    sequelize,
    freezeTableName : true,
    modelName       : 'Case_Information',
    timestamp       : true,
    createdAt       : 'created_datetime',
    updatedAt       : 'updated_datetime',
  });

  return Case_Information;
};