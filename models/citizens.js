'use strict';

const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Citizens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.hasOne(models.Citizens, {
      //   foreignKey: 'user_account_ID',
      // }),

      // this.hasOne(models.Citizens, {
      //   foreignKey: 'address_ID',
      // }) 
    } 
  }; 
  
  Citizens.init({

    //Model attributes

    citizen_ID: {
      type          : DataTypes.UUID,
      defaultValue  : Sequelize.UUIDV4,
      primaryKey    : true,
      allowNull     : false,
      comment       : 'This contains the unique identifiers for each record on this table'
    },

    user_account_ID: {
      type          : DataTypes.UUID,
      unique        : true,
      allowNull     : false,
      validate: {
        notNull: {
          msg: 'User account ID cannot be null'
        }
      },
      // references    : {
      //   model   : {
      //     tableName : 'user_contacts'
      //   },
      //   key         : 'user_account_ID'
      // },
      comment       : 'This links a user to indicate who owns the account per type'
    },

    first_name: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate: {
        notNull: {
          msg: 'First Name cannot be null',
        },
        isAlpha: {
          msg: 'Must be only letters',
        }
      },
      comment        : 'This contains the first name of the user (citizen)'
    },

    middle_name: {
      type          : DataTypes.STRING,
      allowNull     : true,
      validate: {
        isAlpha: {
          msg: 'Must be only letters',
        }
      },
      comment        : 'This contains the middle name of the user (citizen)'
    },

    last_name: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate: {
        notNull: {
          msg: 'Last Name cannot be null',
        },
        isAlpha: {
          msg: 'Must be only letters',
        }
      },
      comment        : 'This contains the last name of the user (citizen)'
    },

    sex: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'Sex cannot be null',
        },
        isIn: {
          args: [[
            'Biologically Male', 
            'Biologically Female'
          ]],
          // TODO: please include message for this validation
        }
      },
      comment        : 'This indicates the sex of the user (citizen)'
    },    

    birth_date: {
      type          : DataTypes.DATEONLY,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'Birthdate cannot be null',
        },
        isDate : {
          // TODO: please include message for this validation
        },
      },
      comment        : 'This contains the birthdate of the user (citizen)'
    },    

    address_ID: {
      type          : DataTypes.UUID,
      unique        : true,
      allowNull     : false,
      validate: {
        notNull: {
          msg: 'Address ID cannot be null'
        }
      },
      // references    : {
      //   model  : {
      //     tableName : 'addresses'
      //   },
      //   key         : 'address_ID'
      // },
      comment       : 'This contains the current address where the user resides'
    },

    civil_status: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'Civil Status cannot be null',
        },
        isIn: {
          args: [[
            'Single', 
            'Married', 
            'Separated', 
            'Divorced', 
            'Widowed', 
            'Civil Partnership', 
            'Former Civil Partner'
          ]],
          msg: 'Must be a valid civil status'
        }
      },
      comment        : 'This indicates the civil status of the user (citizen)'
    },    

  }, {

    // Model options

    sequelize,
    freezeTableName : true,
    modelName       : 'Citizens',
    timestamps      : true,
    createdAt       : 'created_datetime',
    updatedAt       : 'updated_datetime',
  });

  return Citizens;
};