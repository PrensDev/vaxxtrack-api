'use strict';
const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Lab_Reports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // 1:1 with [cases]
      this.hasOne(models.Case_Information, {
        foreignKey : 'lab_report_ID',
        as         : 'case_information',
        onDelete   : 'RESTRICT'
      });
    }
  };

  Lab_Reports.init({

    // Model Attributes

    lab_report_ID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
      comment: 'This contains the unique identifiers for each record on this table',
    },

    laboratory: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: '[lab_reports].[laboratory] cannot be blank or empty'
        }
      },
      comment: 'This contains the laboratory name where the test has been executed',
    },

    requested_exam: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: '[lab_reports].[requested_exam] cannot be blank or empty'
        }
      },
      comment: 'This contains the type of exam that has been requested by the patient',
    },

    requested_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: '[lab_reports].[requested_datetime] mus have a valid value',
        },
      },
      comment: 'This contains the date and time when the patient has been request for the exam'
    },

    collected_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: '[lab_reports].[collected_datetime] mus have a valid value',
        },
      },
      comment: 'This contains the date and time when the speciment has been collected for the exam',

    },

    released_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: '[lab_reports].[released_datetime] mus have a valid value',
        },
      },
      comment: 'This contains the date and time when the report has been released'
    },

    specimen_ID: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[lab_reports].[specimen_ID] cannot be null',
        },
        notEmpty: {
          msg: '[lab_reports].[specimen_ID] cannot be blank or empty'
        }
      },
      comment: 'This contains the specimen ID given by the authorized healthcare professional',
    },

    specimen_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[lab_reports].[specimen_type] cannot be null'
        },
        notEmpty: {
          msg: '[lab_reports].[specimen_ID] cannot be blank or empty'
        }
      },
      comment: 'This contains the type of specimen used for the test'
    },

    result: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [
            [
              'Positive for SARS-CoV-2',
              'Negative for SARS-CoV-2',
              'Negative for test internal control',
            ]
          ],
          msg: '[lab_reports].[result] value must be `Positive for SARS-CoV-2`, `Negative for SARS-CoV-2`, or `Negative for test internal control` only',
        },
      },
      comment: 'This indicates the result of the test that have been examined'
    },

    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'This contains some remarks for a report',
    },

    performed_by: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[lab_reports].[performed_by] cannot be null',
        },
        notEmpty: {
          msg: '[lab_reports].[performed_by] cannot be blank or empty'
        }
      },
      comment: 'This contains the name of healthcare professional who performed the test'
    },

    verified_by: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[lab_reports].[verified_by] cannot be null',
        },
        notEmpty: {
          msg: '[lab_reports].[verified_by] cannot be blank or empty'
        }
      },
      comment: 'This contains the name of person who verified the report'
    },

    noted_by: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'This contains the name of person who include remarks on the report'
    },

    encoded_by: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[lab_reports].[encoded_by] cannot be null',
        },
        notEmpty: {
          msg: '[lab_reports].[encoded_by] cannot be blank or empty'
        }
      },
      comment: 'This contains the name of person who encode the report'
    },

  }, {

    // Model Options

    sequelize, // To pass the connection instance
    freezeTableName: true,
    modelName: 'Lab_Reports',
    timestamps: true,
    createdAt: 'created_datetime',
    updatedAt: 'updated_datetime',

    hooks: {
      afterCreate: () => {
        if(process.env.ENABLE_MODEL_LOGS === 'true') {
          console.log('A new record has been added to table [lab_reports]');
        }
      }
    }
  });

  return Lab_Reports;
};