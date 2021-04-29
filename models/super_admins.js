'use strict';

const {Sequelize, Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Super_Admins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  Super_Admins.init({
    
    //Model Attributes

    super_admin_ID: {
      type            : DataTypes.UUID,
      aalowNull       : false,
      primaryKey      : true,
      defaultValue    : Sequelize.UUIDV4,
      validations     : {
        msg: 'Super Admin ID cannot be null'
      },
      comment     : 'This contains the unique identifiers for each record on this table'
    },


    first_name: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'First Name cannot be null',
        },
        isAlpha: {
          msg: 'Must be only letters',
        }
      },
      comment        : 'This contains the first name of the user (super_admin)'
    },


    middle_name: {
      type          : DataTypes.STRING,
      allowNull     : true,
      validate      : {
        isAlpha: {
          args: true,
          msg: 'Must be only letters',
        }
      },
      comment        : 'This contains the middle name of the user (super_admin)'
    },


    last_name: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'Last Name cannot be null',
        },
        isAlpha: {
          msg: 'Must be only letters',
        }
      },
      comment        : 'This contains the last name of the user (super_admin)'
    },

    // created_datetime: {
    //   type           : DataTypes.DATE,
    //   comment        : 'This indicate the date and time that a record has been created',
    // },

    // updated_datetime: {
    //   type           : DataTypes.DATE,
    //   comment        : 'This indicate the date and time that a record has been updated',
    // },
      
  }, {
    //Model Options
    sequelize,
    freezeTableName  : true,
    modelName        : 'Super_Admins',
    createdAt        : 'created_datetime',
    updatedAt        : 'updated_datetime',
  });
  return Super_Admins;
};