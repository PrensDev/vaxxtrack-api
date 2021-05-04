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
      
      // M:1 with [vaccines]
      this.belongsTo(models.Vaccines, {
        foreignKey  : 'preferred_vaccine',
        as          : 'vaccine',
        onDelete    : 'RESTRICT'
      });

      // M:1 with [users]
      this.belongsTo(models.Users, {
        foreignKey  : 'citizen_ID',
        as          : 'citizen',
        scope       : { user_type: 'Citizen' },
        onDelete    : 'RESTRICT'
      });
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
    
    preferred_vaccine: {
      type                  : DataTypes.UUID,
      allowNull             : false,
      validate              : {
        isUUID              : {
          msg               : 'vaccine_ID must be a valid UUID value'
        }
      },
      comment               : 'this contains what type of vaccine the patient chose'
    },

    preferred_date: {
      type             : DataTypes.DATE,
      allowNull        : false,
      validate         : {
        notNull: {
          msg: 'Date of Vaccination cannot be null'
        }
      },
      comment          : 'This contains the preferred date of patient when to vaccinate'
    },

    citizen_ID: {
      type             : DataTypes.UUID,
      allowNull        : false,
      validate         : {
        notNull: {
          msg: 'Citizen ID cannot be null'
        }
      },
      comment          : 'this contains the unique identifiers for each citizen record'
    },

    status_approval: {
      type               : DataTypes.STRING,
      allowNull          : false,
      validate: {
        isIn: {
          args: [[
            'pending',
            'approved',
            'rejected',
          ]],
          msg             : 'The status approval has invalid value'
        }
      },
      comment            : 'This indicates whether the patients appointment is pending, approved or rejected'
    },
    
    approved_by: {
      type               : DataTypes.STRING,
      allowNull          : true,
      comment            : 'this contains the information on who approved the vaccination date for the patient'
    },

    approved_datetime: {
      type               : DataTypes.DATE,
      allowNull          : true,
      comment            : 'this contains the information about the patients approved date of vaccination'
    },

  }, {

    // Model Options 

    sequelize,
    freezeTableName : true,
    modelName       : 'Vaccination_Appointments',
    timestamp       : true,
    createdAt       : 'created_datetime',
    updatedAt       : 'updated_datetime',

    hooks: {
      afterCreate: () => {
        console.log('A new record has been added to [vaccination_appointments]')
      }
    }
    
  });
  
  return Vaccination_Appointments;
};