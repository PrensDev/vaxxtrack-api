'use strict';
const {
  Sequelize, Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Adresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Adresses.init({
    address_ID: {
      type          : DataTypes.UUID,
      defaultValue  : Sequelize.UUIDV4,
      primaryKey    : true,
      allowNull     : false,
      validate      : {
        notNull     : {
          msg       : 'Address ID cannot be null',
        }
      },
      comment      : 'This contains the unique identifiers for each record on this table'
    },
    
    region: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull     : {
          msg       : 'Region cannot be null',
        }
      },
      comment      : 'This contains the region of the user'
    },
    
    province: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull     : {
          msg       : 'Province cannot be null',
        }
      },
      comment      : 'This contains the province of the user'
    },
    
    city_municipality: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull     : {
          msg       : 'City/municipality cannot be null',
        }
      },
      comment      : 'This contains the city/municipality of the user'
    },

    baranggay_district: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull     : {
          msg       : 'Baranggay/district cannot be null',
        }
      },
      comment      : 'This contains the baranggay/district of the user'
    },
    
    street: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull     : {
          msg       : 'Street cannot be null',
        }
      },
      comment      : 'This contains the street of the user'
    },
    
    specific_location: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull     : {
          msg       : 'Specific location cannot be null',
        }
      },
      comment      : 'This contains the specific location of the user'
    },
    
    zip_code: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull     : {
          msg       : 'Zip code cannot be null',
        }
      },
      comment      : 'This contains the zip code of the user'
    },
    
    latitude: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull     : {
          msg       : 'Latitude cannot be null',
        }
      },
      comment      : 'This contains the latitude of the user'
    },
    
    longitude: {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull     : {
          msg       : 'Longitude cannot be null',
        }
      },
      comment      : 'This contains the longitude of the user'
    },
    

  }, {
    sequelize,
    freezeTableName  : true,
    modelName        : 'Adresses',
    timestamp        : true,
    createdAt        : 'created_datetime',
    updatedAt        : 'updated_datetime',
  });
  return Adresses;
};