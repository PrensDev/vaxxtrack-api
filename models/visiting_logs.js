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
      // define association here
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
        notNull     : {
          msg       : 'Citizen ID must not be null',
        }
      },
      // references    : {
      //   model: {
      //     tableName : 'citizens'
      //   },
      //   key: 'citizen_ID'
      // },
      comment       : 'This links a citizen to indicate who owns the visiting log record'
    },

    establishment_ID: {
      type          : DataTypes.UUID,
      allowNull     : false,
      validate      : {
        notNull     : {
          msg       : 'Establishment ID must not be null',
        }
      },
      // references    : {
      //   model: {
      //     tableName : 'establishments'
      //   },
      //   key: 'establishment_ID'
      // },
      comment       : 'This links the establishments for the visiting logs'
    },

    health_status_log_ID: {
      type          : DataTypes.UUID,
      allowNull     : false,
      validate      : {
        notNull     : {
          msg       : 'Health status log ID must not be null',
        }
      },
      // references    : {
      //   model: {
      //     tableName : 'Health_Status_Logs'
      //   },
      //   key: 'health_status_log_ID'
      // },
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
  });
  
  return Visiting_Logs;
};