'use strict';

const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  
  class User_Accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      // M:1 with [users]
      this.belongsTo(models.Users, {
        foreignKey  : 'user_ID',
        as          : 'user',
        onDelete    : 'RESTRICT',
      });
    }
  };

  User_Accounts.init({

    // Model Attributes

    user_account_ID: {
      type            : DataTypes.UUID,
      allowNull       : false,
      primaryKey      : true,
      defaultValue    : Sequelize.UUIDV4,
      comment         : 'This contains the unique identifiers for each record on this table'
    },

    user_ID: {
      type            : DataTypes.UUID,
      allowNull       : false,
      validate        : {
        notNull: {
          msg: 'User ID cannot be null'
        },
        isUUID: 4,
      },
      comment         : 'This contains the user IDs to indicate the owner of an account'
    },

    details: {
      type            : DataTypes.STRING,
      allowNull       : false,
      validate        : {
        notNull: {
          msg: 'User account details is required'
        }
      },
      comment         : 'This contains the user account details of the users'
    },

    type: {
      type            : DataTypes.STRING,
      allowNull       : false,
      validations     : {
        notNull : {
          msg:'User must provide a Contact',
        },
        isIn    : {
          args    : [[
            'Email',
            'Contact Number',
          ]],
          msg     : 'Please provide valid Email or Contact Number'
        },
      },
      comment         : 'This contains the two different type of contact information a user can give (Email or Contact Number) ',
    },

    verified: {
      type           : DataTypes.BOOLEAN,
      allowNull      : true,
      defaultValue   : 0,
      comment        : 'This indicates if the account of a user is verified or not'
    },
    
  }, {

    // Model Options
    
    sequelize,
    freezeTableName  : true,
    modelName        : 'User_Accounts',
    timestamps       : true,
    createdAt        : 'created_datetime',
    updatedAt        : 'updated_datetime',

    hooks: {
      afterCreate: () => {
        console.log('A new record has been added to table [user_accounts]');
      }
    }
  });

  return User_Accounts;
};