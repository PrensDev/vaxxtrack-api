'use strict';
const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // 1:1 with [users]
      this.hasOne(models.Users, {
        foreignKey: 'address_ID',
        as: 'citizen',
        onDelete: 'RESTRICT',
      });

      // 1:1 with [establishments]
      this.hasOne(models.Establishments, {
        foreignKey: 'address_ID',
        as: 'establishment',
        onDelete: 'RESTRICT',
      });
    }
  };

  Addresses.init({

    // Model attributes

    address_ID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
      comment: 'This contains the unique identifiers for each record on this table'
    },

    region: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[addresses].[region] cannot be null',
        }
      },
      comment: 'This contains the region of the user'
    },

    province: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[addresses].[province] cannot be null',
        }
      },
      comment: 'This contains the province of the user'
    },

    city_municipality: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[addresses].[city_municipality] cannot be null',
        }
      },
      comment: 'This contains the city/municipality of the user'
    },

    barangay_district: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[addresses].[barangay_district] cannot be null',
        }
      },
      comment: 'This contains the barangay/district of the user'
    },

    street: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[addresses].[street] cannot be null',
        }
      },
      comment: 'This contains the street of the user'
    },

    specific_location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[addresses].[specific_location] cannot be null',
        }
      },
      comment: 'This contains the specific location of the user'
    },

    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[addresses].[zip_code] cannot be null',
        }
      },
      comment: 'This contains the zip code of the user'
    },

    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[addresses].[latitude] cannot be null',
        }
      },
      comment: 'This contains the latitude of the user'
    },

    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[addresses].[longitude] cannot be null',
        }
      },
      comment: 'This contains the longitude of the user'
    },

  }, {

    // Model Options

    sequelize,
    freezeTableName: true,
    modelName: 'Addresses',
    timestamp: true,
    createdAt: 'created_datetime',
    updatedAt: 'updated_datetime',

    hooks: {
      afterCreate: () => {
        if (process.env.ENABLE_MODEL_LOGS === 'true' || false) {
          console.log('A new record has been created in table [addresses]');
        }
      }
    }
  });

  return Addresses;
};