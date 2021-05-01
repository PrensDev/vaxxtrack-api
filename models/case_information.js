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
      
      // M:1 with [users]
      this.belongsTo(models.Users, {
        foreignKey  : 'citizen_ID',
        as          : 'citizen',
        onDelete    : 'RESTRICT'
      }); 

      // 1:1 with [case_information]
      this.belongsTo(models.Lab_Reports, {
        foreignKey  : 'case_ID',
        as          : 'lab_report',
        onDelete    : 'RESTRICT'
      })

      // 1:M with [contacts]
      this.hasMany(models.Contacts, {
        foreignKey  : 'case_ID',
        as          : 'contacts',
        onDelete    : 'RESTRICT'
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
        notNull  : {
          msg: 'The citizen ID is required'
        },
        isUUID  : 4,
      },
      comment       : 'This links a citizen to indicate who owns a case record'
    },

    lab_report_ID: {
      type          : DataTypes.UUID,
      allowNull     : false,
      unique        : true,
      validate      : {
        notNull: {
          msg   : 'Lab report ID is required',
        },
        isUUID  : 4,
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
      defaultValue   : 0,
      comment        : 'This indicates that a confirmed positive patient is currently pregnant'
    },

    removal_type: {
      type           : DataTypes.STRING,
      allowNull      : true,
      validate: {
        isIn: {
          args  : [[
            'Recovered', 
            'Died'
          ]],
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
        isIn: {
          args: [[
            'Asymptomatic',
            'Mild',
            'Severe',
            'Critical',
            'Died',
            'Recovered'
          ]],
          msg: 'Invalid input for current health status'
        },
        notNull: {
          msg: 'Current health status cannot be null'
        }
      },
      comment        : 'This indicates the current health status of a patient'
    },
  
  }, {

    // Model Options

    sequelize,
    freezeTableName : true,
    modelName       : 'Case_Information',
    timestamp       : true,
    createdAt       : 'created_datetime',
    updatedAt       : 'updated_datetime',
  
    hooks: {
      afterCreate: () => {
        console.log('A new record has been added to table [addresses]');
      }
    }
  });

  return Case_Information;
};