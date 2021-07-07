'use strict';
const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Visiting_Logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      // M:1 [visiting_logs]:[users]
      this.belongsTo(models.Users, {
        foreignKey : 'citizen_ID',
        as         : 'visiting_log_by',
        onDelete   : 'RESTRICT'
      });
      
      // M:1 [visiting_logs]:[users]
      this.belongsTo(models.Establishments, {
        foreignKey : 'establishment_ID',
        as         : 'visiting_log_for',
        onDelete   : 'RESTRICT'
      });
      
      // M:1 [visiting_logs]:[health_status_logs]
      this.belongsTo(models.Health_Status_Logs, {
        foreignKey : 'health_status_log_ID',
        as         : 'health_status_log',
        onDelete   : 'RESTRICT'
      });
    }
  };

  Visiting_Logs.init({

    // Model attirbutes

    visiting_log_ID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
      comment: 'This contains the unique identifiers for each record on this table'
    },

    citizen_ID: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        isUUID: {
          args: 4,
          msg: '[visiting_logs].[citizen_ID] value must be a UIUDV4 type'
        },
        notNull: {
          msg: '[visiting_logs].[citizen_ID] cannot be null',
        }
      },
      comment: 'This links a citizen to indicate who owns the visiting log record'
    },

    establishment_ID: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        isUUID: {
          args: 4,
          msg: '[visiting_logs].[establishment_ID] value must be a UIUDV4 type'
        },
        notNull: {
          msg: '[visiting_logs].[establishment_ID] must not be null',
        }
      },
      comment: 'This links the establishments for the visiting logs'
    },

    temperature: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        isNumeric: {
          msg: '[visiting_logs].[temperature] can only accepts numeric value'
        }
      },
      comment: 'This indicate the temperature of citizen before entering into an establishment'
    },

    health_status_log_ID: {
      type: DataTypes.UUID,
      allowNull: true,
      validate: {
        isUUID: {
          args: 4,
          msg: '[visiting_logs].[health_status_log_ID] value must be a UIUDV4 type'
        },
      },
      comment: 'This links the health status log for the visiting logs'
    },

    purpose: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [[
            'Visiting',
            'Customer',
            'Employee',
            'Meeting',
            'Resident',
            'Organizational Event',
            'Others'
          ]],
          msg: '[visiting_logs].[purpose] value must be `Visiting`, `Customer`, `Employee`, `Meeting`, `Resident`, `Organizational Event`, or `Others` only'
        }
      },
      comment: 'This indicate the visiting purpose of visitor in an establishment'
    },

  }, {

    // Model attributes

    sequelize,
    freezeTableName: true,
    modelName: 'Visiting_Logs',
    timestamp: true,
    createdAt: 'created_datetime',
    updatedAt: 'updated_datetime',

    hooks: {
      afterCreate: () => {
        if (process.env.ENABLE_MODEL_LOGS === 'true') {
          console.log('A new record has been addded to table [visiting_logs]');
        }
      }
    }
  });

  return Visiting_Logs;
};