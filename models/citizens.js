'use strict';
const {
  Sequelize, Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Citizens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // define association here
      this.hasOne(models.Citizens, {

        foreignKey: 'citizen_ID',
      }) 
  
    }
  };
  Citizens.init({

    // Model attributes

    citizen_ID: {
      type          : DataTypes.UUID,
      defaultValue  : Sequelize.UUIDV4,
      primaryKey    : true,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'This field cannot be null',
        }
      },
      comment        : 'This contains the unique identifiers for each record on this table'
    },

    user_account_ID: {
      type          : DataTypes.UUID,
      allowNull     : false,
      validate      : {
        notNull     : {
         msg: 'User account ID cannot be null',
        },
      references    : {
        model       : {
          tableName : 'citizens'
        },
        key         : 'citizen_ID'
      },
      comment       : 'This links a user to indicate who owns the account per type'
    },


  }, {

    // Model Options

    sequelize,
    freezeTableName : true,
    modelName       : 'Citizens',
    timestamps      : true,
    createdAt       : 'created_datetime',
    updatedAt       : 'updated_datetime',
  });


  return Citizens;
};