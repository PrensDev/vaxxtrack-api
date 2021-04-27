'use strict';
const { Sequelize, Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  
  class Representatives extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  Representatives.init({

    // Model Attributes

    representative_ID: {
      type          : DataTypes.UUID,
      allowNull     : false,
      primaryKey    : true,
      defaultValue  : Sequelize.UUIDV4,
      validations   : {
        notNull: {
          msg: 'This representative ID cannot be null'
        }
      },
      comment       : 'This contains the unique identifiers for each record on this table'
    },

    // user_account_ID : {
    //   type          : DataTypes.UUID,
    //   allowNull     : false,
    //   validations   : {
    //     notNull: {
    //       msg: 'This user account ID cannot be null'
    //     }
    //   },
    //   comment       : ''
    // }, 
    
    }, {

    // Model options

    sequelize,
    freezeTableName : true,
    modelName       : 'Representatives',
    timestamps      : true,
    createdAt       : 'created_datetime',
    updatedAt       : 'updated_datetime',
  });

  return Representatives; 
};