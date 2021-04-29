'use strict';

const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  
  class Health_Officials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  Health_Officials.init({

    //Model attributes

    health_official_ID: {
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
      validate      : {
        notNull     : {
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
      validate      : {
        notNull: {
          msg: 'First Name cannot be null',
        },
        isAlpha: {
          msg: 'Must be only letters',
        }
      },
      comment        : 'This contains the first name of the user (health_official)'
    },

    middle_name: {
      type          : DataTypes.STRING,
      allowNull     : true,
      validate      : {
        isAlpha: {
          msg: 'Must be only letters',
        }
      },
      comment        : 'This contains the middle name of the user (health_official)'
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
      comment        : 'This contains the last name of the user (health_official)'
    },

    LGU: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'LGU cannot be null',
        },
      },
      comment        : 'This contains the local government unit where the health official belongs to'
    },

    added_by: {
      type          : DataTypes.UUID,
      unique        : true,
      allowNull     : false,
      validate: {
        notNull: {
          msg: 'This field cannot be null'
        }
      },
      // references    : {
      //   model   : {
      //     tableName : 'super_admins'
      //   },
      //   key         : 'super_admin_ID'
      // },
      comment       : 'This links the super admin that indicates who added the health official'
    },

  }, {

    // Model options

    sequelize,
    freezeTableName : true,
    modelName       : 'Health_Officials',
    timestamps      : true,
    createdAt       : 'created_datetime',
    updatedAt       : 'updated_datetime',
  });

  return Health_Officials;
};