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
      comment        : 'This contains the unique identifiers for each record on this table'
    },


    password :{
      type            : DataTypes.STRING,
      allowNull       : false,
      validations     : {
        notNull:{
          msg:'User must enter password',
        }
      },
      comment          : 'This contains the password that the user will set.',
      
    },

    
  }, {

  //Modle Options
    sequelize,
    freezeTableName  : true,
    modelName        : 'User_Accounts',
    timestamps       : true,
    createdAt        : 'created_datetime',
    updatedAt        : 'updated_datetime',
  });

  return User_Accounts;
};