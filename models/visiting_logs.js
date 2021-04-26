'use strict';
const {
  Sequelize, Model
} = require('sequelize');
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
    visiting_log_ID: {
      type          : DataTypes.UUID,
      defaultValue  : Sequelize.UUIDV4,
      primaryKey    : true,
      allowNull     : false,
      validate      : {
        notNull     : {
          msg       : 'This field cannot be null',
        }
      },
      comment      : 'This contains the unique identifiers for each record on this table'
    },

    citizen_ID: {
      type          : DataTypes.UUID,
      allowNull     : false,
      validate      : {
        notNull     : {
          msg       : 'Citizen_ID must not be null',
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

  }, {
    sequelize,
    freezeTableName  : true,
    modelName        : 'Visiting_Logs',
    timestamp        : true,
    createdAt        : 'created_datetime',
    updatedAt        : 'updated_datetime',
  });
  return Visiting_Logs;
};