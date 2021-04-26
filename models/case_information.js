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
      comment       : 'This contains the unique identifiers for each record for this table'
    },

    case_code: {
      type          : DataTypes.STRING,
      unique        : true,
      allowNull     : false,
      validation    : {
        notNull: {
          msg: 'Case code is required'
        }
      },
      comment       : 'This contains the case codes of each case information'
    },

    citizen_ID: {
      type          : DataTypes.UUID,
      allowNull     : false,
      validate      : {
        isUUID  : {
          msg: 'The citizen ID must be a valid UUID value'
        },
        notNull  : {
          msg: 'The citizen ID is required'
        }
      },
      comment       : 'This links a citizen to indicate who owns a case record'
    },

    lab_report_ID: {
      type          : DataTypes.UUID,
      allowNull     : false,
      unique        : true,
      validate      : {
        isUUID: {
          args  : 4,
          msg   : 'Lab report ID must be a valid UUID value',
        },
        notNull: {
          msg   : 'Lab report ID is required',
        },
      },
      references: {
        model   : {
          tableName: 'lab_reports'
        },
        key     : 'lab_report_ID'
      },
      comment        : 'This links to a lab report for each case'
    },

    confirmed_date: {
      type           : DataTypes.DATEONLY,
      allowNull      : false,
      validate       : {
        isDate: {
          msg:  'Confirmed date must be a valid date'
        }
      },
      comment        : 'This contains the date when a case is declared publicly as confirmed'
    },

    admitted: {
      type           : DataTypes.BOOLEAN,
      allowNull      : false,
      comment        : 'This indicates if a patient had been admitted to any healthcare establishments'
    },

    is_pregnant: {
      type           : DataTypes.BOOLEAN,
      allowNull      : false,
      comment        : 'This indicates that a confirmed positive patient is currently pregnant'
    },

    removal_type: {
      type           : DataTypes.STRING,
      allowNull      : true,
      validate: {
        isIn: {
          args  : [['Recovered', 'Died']],
          msg   : 'The removal type is invalid'
        }
      },
      comment        : 'This indicates if the patient is recovered or died'
    },

    removal_date: {
      type           : DataTypes.DATEONLY,
      allowNull      : true,
      comment        : 'This contains the date when the patient had been removed from being active case'
    },

    current_health_status: {
      type           : DataTypes.STRING,
      allowNull      : false,
      validate       : {
        inIn: {
          args: [[
            'Asymptomatic',
            'Mild',
            'Severe',
            'Critical',
            'Died',
            'Recovered'
          ]],
          msg: 'Invalid input for current health status'
        }
      },
      comment        : 'This indicates the current health status of a patient'
    },

    created_datetime: {
      type           : DataTypes.DATE,
      comment        : 'This indicate the date and time that a record has been created',
    },

    updated_datetime: {
      type           : DataTypes.DATE,
      comment        : 'This indicate the date and time that a record has been updated',
    },
  
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