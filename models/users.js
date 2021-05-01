'use strict';

const { Sequelize, Model } = require('sequelize');

// Bcrypt lib for encrypting password
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // 1:M with [user_accounts]
      this.hasMany(models.User_Accounts, {
        foreignKey  : 'user_ID',
        as          : 'user_accounts',
        onDelete    : 'RESTRICT',
      });

      // 1:M with [case_information]
      this.hasOne(models.Case_Information, {
        foreignKey  : 'citizen_ID',
        as          : 'case',
        onDelete    : 'RESTRICT'
      });

      // 1:M with [health_status_logs]
      this.hasMany(models.Health_Status_Logs, {
        foreignKey  : 'citizen_ID',
        as          : 'health_status_logs',
        onDelete    : 'RESTRICT'
      });

      // 1:M with [vaccination_appointments]
      this.hasMany(models.Vaccination_Appointments, {
        foreignKey  : 'citizen_ID',
        as          : 'vaccination_appointments',
        onDelete    : 'RESTRICT'
      });

      // 1:M with [vaccination_records]
      this.hasMany(models.Vaccination_Records, {
        foreignKey  : 'citizen_ID',
        as          : 'vaccination_records',
        onDelete    : 'RESTRICT'
      });
    }
  };

  Users.init({

    // Model attributes
    
    user_ID: {
      type          : DataTypes.UUID,
      defaultValue  : Sequelize.UUIDV4,
      primaryKey    : true,
      allowNull     : false,
      comment       : 'This contains the unique identifiers for each record on this table'
    },

    first_name: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate: {
        notNull: {
          msg: 'First Name cannot be null'
        },
      },
      comment        : 'This contains the first name of the user'
    },

    middle_name: {
      type          : DataTypes.STRING,
      allowNull     : true,
      comment        : 'This contains the middle name of the user'
    },

    last_name: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate: {
        notNull: {
          msg: 'Last Name cannot be null'
        },
      },
      comment        : 'This contains the last name of the user'
    },

    sex: {
      type          : DataTypes.STRING,
      allowNull     : true,
      validate      : {
        isIn: {
          args: [[
            'Biologically Male', 
            'Biologically Female'
          ]],
          msg: 'Must be a valid sex'
        },
      },
      comment        : 'This indicates the sex of the user'
    },    

    birth_date: {
      type          : DataTypes.DATEONLY,
      allowNull     : true,
      validate      : {
        isDate : {
          msg: 'Birthdate must be a valid date.'
        },
      },
      comment        : 'This contains the birthdate of the user'
    },   
    
    civil_status: {
      type          : DataTypes.STRING,
      allowNull     : true,
      validate      : {
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
      comment        : 'This indicates the civil status of the user'
    },

    address_ID: {
      type          : DataTypes.UUID,
      unique        : true,
      allowNull     : true,
      // references    : {
      //   model  : {
      //     tableName : 'addresses'
      //   },
      //   key         : 'address_ID'
      // },
      comment       : 'This contains the current address where the user resides'
    },

    position: {
      type          : DataTypes.STRING,
      allowNull     : true,
      comment        : 'This column is specifically for representatives which identifies his/her position in an establishment'
    },

    added_by: {
      type          : DataTypes.UUID,
      unique        : true,
      allowNull     : true,
      // references    : {
      //   model  : {
      //     tableName : 'users'
      //   },
      //   key         : 'users_ID'
      // },
      comment       : 'This column is specifically for health officials to identify whose user, specifically super admin, added him/her.'
    },

    user_type: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate: {
        notNull: {
          msg: 'Last name cannot be null'
        },
        isIn: {
          args: [[
            'Citizen', 
            'Representative', 
            'Health Official', 
            'Super Admin'
          ]],
          msg: 'User type must have a valid value'
        }
      },
      comment        : 'This contains the identification of a user. '
    },

    password: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate: {
        notNull: {
          msg: 'Password field cannot be null'
        },
      },
      comment        : 'This contains the encrypted password for authorization'
    },

  }, {

    // Model options

    sequelize,
    freezeTableName : true,
    modelName       : 'Users',
    timestamps      : true,
    createdAt       : 'created_datetime',
    updatedAt       : 'updated_datetime',

    hooks: {
      
      beforeCreate: (users, options) => {
        users.password = bcrypt.hashSync(users.password, 10);
      },
      
      afterCreate: () => {
        console.log('A new record has been added to table [users]');
      }
    }
  });

  return Users;
};