'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Vaccination_Appointments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  Vaccination_Appointments.init({

    // Model attributes


    vaccination_appointment_ID: {
      type                  : DataTypes.UUID,
      defaultValue          : Sequelize.UUIDV4,
      primaryKey            : true,
      allowNull             : false,
      comment               : 'This contains the unique identifiers for each record on this table'
    },
    
    preferred_vaccine        : {
      type                  : DataTypes.UUID,
      allowNull             : false,
      validate              : {
        isUUID              : {
          msg               : 'vaccine_ID must be a valid UUID value'
        }
      },
      // references            : {
      //   model               : {
      //     tableName         : 'vaccines'
      //   },
      //   key                 : 'vaccine_ID'
      // },
      comment               : 'this contains what type of vaccine the patient chose'
    },

    preferred_date      : {
      type             : DataTypes.DATE,
      allowNull        : false,
      validate         : {
        notNull        : {
          msg          : 'Date of vaccination is required'
        }
      },
      comment          : 'this contains the patients preffered date to be vaccinated'
    },

    citizen_ID          : {
      type             : DataTypes.UUID,
      allowNull        : false,
      validate         : {
        isUUID         : {
          msg          : 'citizen_ID must be a valid UUID value'
        }
      },
      //references       : {
      // model          : {
      //    tableName    : 'citizens'
      //  },
      //  key            : 'citizen_ID'
      //},
      comment          : 'this contains the unique identifiers for each citizen record'
    },

    status_approval       : {
      type               : DataTypes.STRING,
      allowNull          : false,
      validate           : {
        isIn             : {
          args: [[
            'pending',
            'approved',
            'rejected',
          ]],
          msg             : 'the status approval is invalid'
        }
      },
      comment            : 'this indicates whether the patients appointment is pending, approved or rejected'
    },

    
    approved_by           : {
      type               : DataTypes.STRING,
      allowNull          : true,
      // references         : {
      //   model            : {
      //     tableName      : 'health_official'
      //   },
      //   key              : 'health_official_ID'
      // },
      comment            : 'this contains the information on who approved the vaccination date for the patient'
    },

    approved_datetime     : {
      type               : DataTypes.DATE,
      allowNull          : true,
      comment            : 'this contains the information about the patients approved date of vaccination'
    },


  }, {

    // model options 

    sequelize,
    freezeTableName : true,
    modelName       : 'Vaccination_Appointments',
    timestamp       : true,
    createdAt       : 'created_datetime',
    updatedAt       : 'updated_datetime',
    
  });
  return Vaccination_Appointments;
};