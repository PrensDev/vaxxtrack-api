'use strict';
const { Model, Sequelize } = require('sequelize');

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
        foreignKey : 'preferred_vaccine',
        as         : 'vaccine_preferrence',
        onDelete   : 'RESTRICT'
      });

      // M:1 with [users]
      // Citizens only
      this.belongsTo(models.Users, {
        foreignKey : 'citizen_ID',
        as         : 'appointed_by',
        scope      : { user_type: 'Citizen' },
        onDelete   : 'RESTRICT'
      });

      // 1:1 with [users] (for appointments)
      this.belongsTo(models.Users, {
        foreignKey : 'approved_by',
        as         : 'approved_person',
        onDelete   : 'RESTRICT'
      });
    }
  };

  Vaccination_Appointments.init({

    // Model attributes

    vaccination_appointment_ID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
      comment: 'This contains the unique identifiers for each record on this table'
    },

    preferred_vaccine: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        isUUID: {
          args: 4,
          msg: '[vaccination_appointments].[vaccine_ID] value must be a UUIDV4 type'
        }
      },
      comment: 'this contains what type of vaccine the patient chose'
    },

    preferred_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[vaccination_appointments].[preferred_date] cannot be null'
        },
        isDate: {
          msg: '[vaccination_appointments].[preferred_date] must contain a valid date'
        }
      },
      comment: 'This contains the preferred date of patient when to vaccinate'
    },

    citizen_ID: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        isUUID: {
          args: 4,
          msg: '[vaccination_appointments].[citizen_ID] value must be a UUIDV4 type'
        },
        notNull: {
          msg: '[vaccination_appointments].[citizen_ID] cannot be null'
        }
      },
      comment: 'this contains the unique identifiers for each citizen record'
    },

    status_approval: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending',
      validate: {
        isIn: {
          args: [['Pending', 'Approved', 'Rejected']],
          msg: '[vaccination_appointments].[status_approval] value must be `Pending`, `Approved`, or `Rejected` only'
        }
      },
      comment: 'This indicates whether the patients appointment is pending, approved or rejected'
    },

    approved_by: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: 'this contains the information on who approved the vaccination date for the patient'
    },

    approved_datetime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'this contains the information about the patients approved date of vaccination'
    },

  }, {

    // Model Options 

    sequelize,
    freezeTableName: true,
    modelName: 'Vaccination_Appointments',
    timestamp: true,
    createdAt: 'created_datetime',
    updatedAt: 'updated_datetime',

    hooks: {
      afterCreate: () => {
        if(process.env.ENABLE_MODEL_LOGS === 'true') {
          console.log('A new record has been added to [vaccination_appointments]')
        }
      }
    }

  });

  return Vaccination_Appointments;
};