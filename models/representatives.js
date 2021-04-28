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

    user_account_ID : {
      type          : DataTypes.UUID,
      allowNull     : false,
      validations   : {
        notNull: {
          msg: 'This user account ID cannot be null'
        }
      },
      comment       : 'This links a user to indicate who owns the account per type'
    }, 

    first_name: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'First Name cannot be null',
        },
        isAlpha: {
          args: true,
          msg: 'Must be only letters',
        }
      },
      comment        : 'This contains the first name of the representative'
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
      comment        : 'This contains the middle name of the representative'
    },

    last_name: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'Last Name cannot be null',
        },
        isAlpha: {
          args: true,
          msg: 'Must be only letters',
        }
      },
      comment        : 'This contains the last name of the representative'
    },

    position: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'position cannot be null',
        },
        isIn: {
          args: [['Company', 'BusinessVillage/Household', 'LGU', 'Organizational' ]],
          msg: 'Must be a valid position'
        }
      },
      comment        : 'This contains the position of the representative in the establishment'
    }, 
    
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