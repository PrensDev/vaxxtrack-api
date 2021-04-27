'use strict';
const {
  Sequelize, Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vaccines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Vaccines.init({
    vaccine_ID : {
      type          :DataTypes.UUID,
      allowNull     :false,
      defaultValue  :Sequelize.UUIDv4,
      primaryKey    :true,
      validations   : {
        notNull : {
          msg :'This column cannot be null'
        }
      },
      comment        :'This contains the unique identifiers for each record on this table'
    },

    product_name : {
      type            :DataTypes.STRING,
      allowNull       :false,
      comment         :'In this column tells the name of the vaccine'
    },

    manufacturer : {
      type            :DataTypes.STRING,
      allowNull       :false,
      comment         :'In this column tells the name of the manufacturer'
    },

    description : {
      type            :DataTypes.STRING,
      allowNull       :false,
      comment         :'In this column tells the description of the vaccine'
    },

    created_datetime : {
      type          :DataTypes.DATE,
      comment       :'This contains the date and time that a record had been created'
    },

    updated_datetime : {
      type          :DataTypes.DATE,
      comment       :'This contains the date and time that a record had been edited'
    },

  }, {
    sequelize,
    freezeTableName : true,
    modelName       : 'Vaccines',
    timestamps      : true,
    createdAt       : 'created_datetime',
    updatedAt       : 'updated_datetime',
  });
  return Vaccines;
};