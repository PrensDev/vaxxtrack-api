'use strict';
const { Sequelize, Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_Accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User_Accounts.init({

    //model attributes

    user_account_ID: {
      type            : DataTypes.UUID,
      aalowNull       : false,
      primaryKey      : true,
      defaultValue    : Sequelize.UUIDV4,
      validations     :  {
        notNull: {
          msg         :'This user account cannot be null'
        }

      },
      comment         : 'This contains the unique identifiers for each record on this table'
    },


    type: {
      type            : DataTypes.STRING,
      allowNull       : false,
      validations     : {
        notNull:{
        msg:'User must provide a Contact',
        },
        isIn: {
          args: [[
            'Email',
            'Contact Number',
          ]],
          msg: 'Please provide valid Email or Contact Number'
        },
      },
      comment         : 'This contains the two different type of contact information a user can give (Email or Contact Number) ',
    },



    verified: {
      type           : DataTypes.BOOLEAN,
      allowNull      : false,
      comment        : 'This indicates if  the account is verified or not'
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

    //Model options
    
    sequelize,
    freezeTableName  : true,
    modelName        : 'User_Accounts',
    timestamps       : true,
    createdAt        : 'created_datetime',
    updatedAt        : 'updated_datetime',
  });

  return User_Accounts;
};