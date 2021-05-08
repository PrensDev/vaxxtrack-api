'use strict';
const { Sequelize, Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  
  class Establishments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // 1:1 with [addresses]
      this.belongsTo(models.Addresses, {
        foreignKey  : 'address_ID',
        as          : 'address',
        onDelete    : 'RESTRICT'
      });

      // 1:M with [visiting_logs]
      this.hasMany(models.Visiting_Logs, {
        foreignKey  : 'establishment_ID',
        as          : 'visiting_logs',
        onDelete    : 'RESTRICT'
      });

      // M:M [users]:[establishments] through [roles]
      this.belongsToMany(models.Users, {
        through     : 'Roles',
        as          : 'representatives_and_roles',
        foreignKey  : 'establishment_ID',
        otherKey    : 'representative_ID',
      });

      // M:M [users]:[establishments] through [visiting_logs]
      this.belongsToMany(models.Users, {
        through     : 'Visiting_Logs',
        as          : 'citizens_with_vlogs',
        foreignKey  : 'establishment_ID',
        otherKey    : 'citizen_ID',
      });
    }
  };


  Establishments.init({

    // Model attributes

    establishment_ID: {
      type          : DataTypes.UUID,
      allowNull     : false,
      primaryKey    : true,
      defaultValue  : Sequelize.UUIDV4,
      validations   : {
        notNull: {
          msg: 'This establishment ID cannot be null'
        }
      },
      comment       : 'This contains the unique identifiers for each record on this table'
    },

    name: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'Name of establishment cannot be null',
        },
      },
      comment        : 'This contains the name of the representative'
    },

    type: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'type cannot be null',
        },
        isIn: {
          args: [[
            'Company', 
            'Business',
            'Industrial', 
            'Village/Household', 
            'LGU', 
            'Organizational'
          ]],
          msg: 'Must be a valid type'
        }
      },
      comment        : 'This contains the type of the establishment'
    }, 
    
    address_ID: {
      type          : DataTypes.UUID,
      allowNull     : false,
      validate      : {
        notNull     : {
          msg       : 'Address ID must not be null',
        }
      },
      comment       :'This links the address of the establsihment'
    },

  }, {

    // Model options

    sequelize,
    freezeTableName : true,
    modelName       : 'Establishments',
    timestamps      : true,
    createdAt       : 'created_datetime',
    updatedAt       : 'updated_datetime',

    hooks: {
      afterCreate: () => {
        if(process.env.ENABLE_MODEL_LOGS || false) {
          console.log('A new record has been added to table [establishments]');
        }
      }
    }
  });

  return Establishments;
};