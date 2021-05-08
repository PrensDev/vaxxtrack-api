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
      
      // // M:1 with [users]
      // this.belongsTo(models.Users, {
      //   foreignKey  : 'citizen_ID',
      //   as          : 'citizen',
      //   scope       : { user_type: 'Citizen' },
      //   onDelete    : 'RESTRICT'
      // });

      // // M:1 with [establishments]
      // this.belongsTo(models.Establishments, {
      //   foreignKey  : 'establishment_ID',
      //   as          : 'establishments',
      //   onDelete    : 'RESTRICT'
      // });

      // M:1 with [health_status_logs]
      this.belongsTo(models.Health_Status_Logs, {
        foreignKey  : 'health_status_log_ID',
        as          : 'health_status_logs',
        onDelete    : 'RESTRICT'
      });
    }
  };

  Visiting_Logs.init({
    
    // Model attirbutes
  
    visiting_log_ID: {
      type          : DataTypes.UUID,
      defaultValue  : Sequelize.UUIDV4,
      primaryKey    : true,
      allowNull     : false,
      comment       : 'This contains the unique identifiers for each record on this table'
    },

    citizen_ID: {
      type          : DataTypes.UUID,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'Citizen ID must not be null',
        }
      },
      references    : {
        model : {
          tableName: 'users'
        },
        key   : 'user_ID'
      },
      comment       : 'This links a citizen to indicate who owns the visiting log record'
    },

    establishment_ID: {
      type          : DataTypes.UUID,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'Establishment ID must not be null',
        }
      },
      references    : {
        model : {
          tableName: 'establishments'
        },
        key   : 'establishment_ID'
      },
      comment       : 'This links the establishments for the visiting logs'
    },

    health_status_log_ID: {
      type          : DataTypes.UUID,
      allowNull     : false,
      validate: {
        notNull: {
          msg: 'Health status log ID must not be null',
        }
      },
      comment       : 'This links the health status log for the visiting logs'
    },

    purpose: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        isIn: {
          args  : [[
            'Visiting', 
            'Customer', 
            'Employee', 
            'Meeting',
          ]],
          msg       : 'The purpose is invalid'
        }
      },
      comment       : 'This indicate the visiting purpose of visitor in an establishment'
    },

  }, {

    // Model attributes

    sequelize,
    freezeTableName  : true,
    modelName        : 'Visiting_Logs',
    timestamp        : true,
    createdAt        : 'created_datetime',
    updatedAt        : 'updated_datetime',

    hooks: {
      afterCreate: () => {
        if(process.env.ENABLE_MODEL_LOGS || false) {
          console.log('A new record has been addded to table [visiting_logs]');
        }
      }
    }
  });
  
  return Visiting_Logs;
};