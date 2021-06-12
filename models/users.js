'use strict';

const { Sequelize, Model } = require('sequelize');

// Bcrypt lib for encrypting password
const bcrypt = require('bcrypt');

// Include all protected attributes
const PROTECTED_ATTRIBUTES = ['password'];

module.exports = (sequelize, DataTypes) => {

  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // 1:M [users]:[user_accounts]
      this.hasMany(models.User_Accounts, {
        foreignKey : 'user_ID',
        as         : 'user_accounts',
        onDelete   : 'RESTRICT',
      });

      // 1:1 [users]:[addresses]
      this.belongsTo(models.Addresses, {
        foreignKey : 'address_ID',
        as         : 'address',
        onDelete   : 'RESTRICT'
      });

      // 1:M [users]:[case_information]
      this.hasOne(models.Case_Information, {
        foreignKey : 'citizen_ID',
        as         : 'case_information',
        onDelete   : 'RESTRICT'
      });

      // 1:M [users]:[health_status_logs]
      this.hasMany(models.Health_Status_Logs, {
        foreignKey : 'citizen_ID',
        as         : 'health_status_logs',
        onDelete   : 'RESTRICT'
      });

      // 1:M [users]:[visiting_logs]
      this.hasMany(models.Visiting_Logs, {
        foreignKey : 'citizen_ID',
        as         : 'visiting_logs',
        onDelete   : 'RESTRICT'
      });

      // 1:M [users]:[vaccination_appointments]
      this.hasMany(models.Vaccination_Appointments, {
        foreignKey : 'citizen_ID',
        as         : 'vaccination_appointments',
        onDelete   : 'RESTRICT'
      });

      // 1:M [users]:[vaccination_records]
      this.hasMany(models.Vaccination_Records, {
        foreignKey : 'citizen_ID',
        as         : 'vaccination_records',
        onDelete   : 'RESTRICT'
      });

      // 1:M [users]:[users]
      // Health officials added by Super Admins
      this.hasMany(models.Users, {
        foreignKey : 'added_by',
        as         : 'health_officials',
        onDelete   : 'RESTRICT'
      });

      // M:1 [users]:[users]
      // Super Admin adding Health Officials
      this.belongsTo(models.Users, {
        foreignKey : 'added_by',
        as         : 'super_admin',
        onDelete   : 'RESTRICT'
      });


      // M:M [users]:[establishments] through [roles]
      this.belongsToMany(models.Establishments, {
        through    : 'Roles',
        as         : 'establishments_with_roles',
        foreignKey : 'representative_ID',
        otherKey   : 'establishment_ID',
        onDelete   : 'RESTRICT'
      });
    }
    
    //  For protected attributes
    toJSON() {
      const attributes = {...this.get()}
      for (const a of PROTECTED_ATTRIBUTES) {
        delete attributes[a];
      }
      return attributes;
    }
  };

  Users.init({

    // Model attributes
    
    user_ID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
      comment: 'This contains the unique identifiers for each record on this table'
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[users].[first_name] cannot be null'
        },
        notEmpty: {
          msg: '[users].[first_name] cannot be blank or empty'
        }
      },
      comment: 'This contains the first name of the user'
    },

    middle_name: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'This contains the middle name of the user'
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[users].[last_name] cannot be null'
        },
        notEmpty: {
          msg: '[users].[last_name] cannot be blank or empty'
        }
      },
      comment: 'This contains the last name of the user'
    },

    suffix_name: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'This contains the last name of the user'
    },

    sex: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: {
          args: [['Male', 'Female']],
          msg: '[users].[sex] value must be `Male` or `Female` only'
        },
      },
      comment: 'This indicates the sex of the user'
    },    

    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate : {
          msg: '[users].[birth_date] must have a valid value'
        },
      },
      comment: 'This contains the birthdate of the user'
    },   
    
    civil_status: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
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
          msg: '[users].[civil_status] value must be `Single`, `Married`, `Separated`, `Divorced`, `Widowed`, `Civil Partnership`, or `Former Civil Partner` only'
        }
      },
      comment: 'This indicates the civil status of the user'
    },

    address_ID: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: true,
      validate: {
        isUUID: {
          args: 4,
          msg: '[users].[address_ID] value must be a UUIDV4 type'
        }
      },  
      comment: 'This contains the current address where the user resides'
    },

    added_by: {
      type: DataTypes.UUID,
      allowNull: true,
      validate: {
        isUUID: {
          args: 4,
          msg: '[users].[added_by] value must be a UUIDV4 type'
        }
      }, 
      comment: 'This column is specifically for health officials to identify whose user, specifically super admin, added him/her.'
    },

    user_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[users].[user_type] cannot be null'
        },
        isIn: {
          args: [[
            'Citizen', 
            'Representative', 
            'Health Official', 
            'Super Admin'
          ]],
          msg: '[users].[user_type] value must be `Citizen`, `Representative`, `Health Official`, or `Super Admin` only'
        }
      },
      comment        : 'This contains the identification of a user. '
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[users].[password] cannot be null'
        },
        notEmpty: {
          msg: '[users].[password] cannot be blank or empty'
        },
      },
      comment: 'This contains the encrypted password for authorization'
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

        // Encrypt user's password before record create 
        users.password = bcrypt.hashSync(users.password, 10);
      },

      // beforeBulkCreate: (users, options) => {
        
      //   // Encrypt user's password before record create 
      //   users.password = bcrypt.hashSync(users.password, 10);
      // },
      
      afterCreate: () => {
        if(process.env.ENABLE_MODEL_LOGS === 'true') {
          console.log('A new record has been added to table [users]');
        }
      }
    }
  });

  return Users;
};