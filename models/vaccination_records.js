'use strict';

const { Sequelize, Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Vaccination_Records extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  Vaccination_Records.init({

    // Model attributes

    vaccination_record__ID: {
      type          : DataTypes.UUID,
      defaultValue  : Sequelize.UUIDV4,
      primaryKey    : true,
      allowNull     : false,
      comment       : 'This contains the unique identifiers for each record on this table'
    },
    
    citizen_ID: {
      type          : DataTypes.UUID,
      allowNull     : false,
      validate      : {
        notNull     : {
          msg       : 'citizen ID must be a valid UUID value'
        }
      },  
      // references    : {
      //   model:  {
      //     tableName:  'citizens'
      //   },
      //   key: 'citizen_ID'
      // },
      comment       : 'this contains the unique identifiers for each citizen record'
    },

    vaccine_ID       : {
      type          : DataTypes.UUID,
      allowNull     : false,
      // references    : {
      //   model       :  {
      //     tableName : 'vaccines'
      //     },
      //     key       :  'vaccine_ID'
      //   },
      validate      : {
        notNull     : {
          msg       : 'vaccine ID must be a valid UUID value'
        }
      },
      comment       : 'this contains the unique ID for vaccines'
    },

    vaccination_date  : {
      type          : DataTypes.DATE,
      allowNull     : false,
      validate      :  {
        notNull     : {
        msg         :  'Date of vaccination is required'
         }
       },
      comment       : 'this contains the vaccination date of the patient'
    },

    vaccinated_by     : {
      type          : DataTypes.STRING,
      allowNull     : false,
      validate      : {
        notNull     : {
          msg       : 'vaccinator name is required'
        }
      },
      comment       : 'this contains the information on who vaccinated the patient'
    },

    vaccinated_in     : {
      type           : DataTypes.STRING,
      allowNull      :  false,
      validate       : {
        notNull      : {
          msg        : 'Place of vaccination is required'
        }
      },
      comment        : 'this contains the location where the patients had been vaccinated'
    },

    remarks            : {
      type           : DataTypes.TEXT,
      allowNull      : true,
      comment        : 'this contains the remarks for the vaccination record'
    },


  }, {

    // Model Options

    sequelize,
    freezeTableName : true,
    modelName       : 'Vaccination_Records',
    timestamp       : true,
    createdAt       : 'created_datetime',
    updatedAt       : 'updated_datetime',
    
  });

  return Vaccination_Records;
};