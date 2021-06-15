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
        foreignKey : 'citizen_ID',
        as         : 'patient',
        scope      : { user_type: 'Citizen' },
        onDelete   : 'RESTRICT'
      });

      // 1:1 with [case_information]
      this.belongsTo(models.Lab_Reports, {
        foreignKey : 'lab_report_ID',
        as         : 'lab_report',
        onDelete   : 'RESTRICT'
      })

      // 1:M with [contacts]
      this.hasMany(models.Contacts, {
        foreignKey : 'case_ID',
        as         : 'contacted_individuals',
        onDelete   : 'RESTRICT'
      });
    }
  };

  Case_Information.init({

    // Model attributes

    case_ID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
      comment: 'This contains the unique identifiers for each record for this table'
    },

    case_code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validation: {
        notNull: {
          msg: '[case_information].[case_code] cannot be null'
        },
        notEmpty: {
          msg: "[case_information].[case_code] cannot be blank or empty"
        }
      },
      comment: 'This contains the case codes of each case information'
    },

    citizen_ID: {
      type: DataTypes.UUID,
      allowNull: true,
      validate: {
        isUUID: {
          args: 4,
          msg: '[case_information].[citizen_ID] value must be a UUIDV4 type'
        },
      },
      comment: 'This links a citizen to indicate who owns a case record'
    },

    lab_report_ID: {
      type: DataTypes.UUID,
      allowNull: true,
      unique: true,
      validate: {
        isUUID: {
          args: 4,
          msg: '[case_information].[lab_report_ID] value must be a UUIDV4 type'
        },
      },
      comment: 'This links to a lab report for each case'
    },

    confirmed_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          msg: '[case_information].[confirmed_date] must have a valid value'
        }
      },
      comment: 'This contains the date when a case is declared publicly as confirmed'
    },

    admitted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: 'This indicates if a patient had been admitted to any healthcare establishments'
    },

    is_pregnant: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: 'This indicates that a confirmed positive patient is currently pregnant'
    },

    removal_type: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: {
          args: [
            ['Recovered', 'Died']
          ],
          msg: '[case_information].[removal_type] values must be `Recovered` or `Died` only'
        }
      },
      comment: 'This indicates if the patient is recovered or died'
    },

    removal_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: {
          msg: '[case_information].[removal_date] must be a valid date'
        }
      },
      comment: 'This contains the date when the patient had been removed from being active case'
    },

    current_health_status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['Asymptomatic','Mild','Severe','Critical','Died','Recovered']],
          msg: '[case_information].[current_health_status] values must be `Asymptomatic`, `Mild`, `Severe`, `Critical`, `Died`, or `Recovered` only'
        },
        notNull: {
          msg: '[case_information].[current_health_status] cannot be null'
        }
      },
      comment: 'This indicates the current health status of a patient'
    },

  }, {

    // Model Options

    sequelize,
    freezeTableName: true,
    modelName: 'Case_Information',
    timestamp: true,
    createdAt: 'created_datetime',
    updatedAt: 'updated_datetime',

    hooks: {
      afterCreate: () => {
        if (process.env.ENABLE_MODEL_LOGS === 'true') {
          console.log('A new record has been added to table [addresses]');
        }
      }
    }
  });

  return Case_Information;
};