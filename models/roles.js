'use strict';
const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // M:1 with [users]
      // representatives only
      this.belongsTo(models.Users, {
        foreignKey: 'representative_ID',
        as: 'representative',
        scope: {
          user_type: 'Representative'
        },
        onDelete: 'RESTRICT',
      });

      // M:1 with [establishments]
      // representatives only
      this.belongsTo(models.Establishments, {
        foreignKey: 'establishment_ID',
        as: 'establishment',
        onDelete: 'RESTRICT',
      });
    }
  };


  Roles.init({

    // Model Attributes

    role_ID: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      comment: 'This contains the unique identifier for this column'
    },

    representative_ID: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[] cannot be null'
        }
      },
      references: {
        model: {
          tableName: 'users'
        },
        key: 'user_ID'
      },
      comment: 'This contains the representatives of an establishment'
    },

    establishment_ID: {
      type: DataTypes.UUID,
      allowNull: false,
      validation: {
        notNull: {
          msg: 'Establishment ID cannot be null'
        }
      },
      references: {
        model: {
          tableName: 'establishments'
        },
        key: 'establishment_ID'
      },
      comment: 'This indicate the establishment where a user is representing'
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notNull: {
          msg: 'Role cannot be null'
        }
      },
      comment: 'This indicate the role of a representative in the establishment'
    },

    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validation: {
        notNull: {
          msg: 'isAdmin cannot be null'
        }
      },
      comment: 'This indicate if the representative have the administrative rights for an establishment'
    },

  }, {

    // Model Options

    sequelize,
    freezeTableName: true,
    modelName: 'Roles',
    timestamp: true,
    createdAt: 'created_datetime',
    updatedAt: 'updated_datetime',

    hooks: {
      afterCreate: () => {
        if (process.env.ENABLE_MODEL_LOGS === 'true') {
          console.log('A new record has been added to table [roles]');
        }
      }
    }
  });
  return Roles;
};