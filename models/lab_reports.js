'use strict';

const { Sequelize, Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Lab_Reports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
    }
  };

  Lab_Reports.init({
    
    // Model Attributes

    lab_report_ID: {
      type          : DataTypes.UUID,
      defaultValue  : Sequelize.UUIDV4,
      primaryKey    : true,  
      allowNull     : false,
      comment       : 'This contains the unique identifiers for each record on this table',
    },
    
    laboratory: {
      type          : DataTypes.STRING,
      allowNull     : false,
      comment       : 'This contains the laboratory name where the test has been executed',
    },

    requested_exam: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        inIn  : [[
          'RT-PCR Test',
          'Rapid Antibody Test',
        ]]
      },
      comment       : 'This contains the type of exam that has been requested by the patient',
    },

    requested_datetime: {
      type          : DataTypes.DATE,
      allowNull     : false,
      validate      : { 
        isDate: {
          msg: 'The requested date and time must be a valid date and time value',
        },
      },
      comment       : 'This contains the date and time when the patient has been request for the exam'
    },

    collected_datetime: {
      type          : DataTypes.DATE,
      allowNull     : false,
      validate      : { 
        isDate: {
          msg: 'The requested date and time must be a valid date and time value',
        },
      },
      comment       : 'This contains the date and time when the speciment has been collected for the exam',

    },

    released_datetime: {
      type          : DataTypes.DATE,
      allowNull     : false,
      validate      : { 
        isDate: {
          msg: 'The released date and time must be a valid date and time value',
        },
      },
      comment      : 'This contains the date and time when the report has been released'
    },

    specimen_ID: {
      type          : DataTypes.STRING,
      unique        : true,
      allowNull     : false,
      validate: {
        notNull: {
          msg:  'You must include the specimen ID',
        },
      },
      comment       : 'This contains the specimen ID given by the authorized healthcare professional',
    },

    specimen_type: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull: {
          msg:  'You must include a spcimen type'
        },
      },
      comment       : 'This contains the type of specimen used for the test'
    },

    result: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate: {
        isIn: {
          args: [[
            'Positive for SARS-CoV-2',
            'Negative for SARS-CoV-2',
            'Negative for test internal control',
          ]],
          msg: 'Invalid input is detected for the result',
        },
      },
      comment       : 'This indicates the result of the test that have been examined'
    },

    remarks: {
      type          : DataTypes.TEXT,
      allowNull     : true,
      comment       : 'This contains some remarks for a report',
    },

    performed_by: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull: 'You must include the name of person who performed the test'
      },
      comment       : 'This contains the name of healthcare professional who performed the test'
    },

    verified_by: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull: 'You must include the name of person who verified the report'
      },
      comment       : 'This contains the name of person who verified the report'
    },

    noted_by: {
      type          : DataTypes.STRING,
      allowNull     : true,
      comment       : 'This contains the name of person who include remarks on the report'
    },

    encoded_by: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'You must include the name of person who encode the report'
        }
      },
      comment       : 'This contains the name of person who encode the report'
    },

  }, {
    
    // Model Options

    sequelize, // To pass the connection instance
    freezeTableName : true,
    modelName       : 'Lab_Reports',
    timestamps      : true,
    createdAt       : 'created_datetime',
    updatedAt       : 'updated_datetime'
  });
  
  return Lab_Reports;
};