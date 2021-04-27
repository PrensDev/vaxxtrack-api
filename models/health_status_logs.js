'use strict';
const {
  Sequelize, Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Health_Status_Logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Health_Status_Logs.init({

    //model attributes

    health_status_log_ID: {
      type          :DataTypes.UUID,
      defaultValue  :Sequelize.UUIDV4,
      allowNull     :false,
      primaryKey    :true,
      validations   : {
        notNull : {
          msg   :'This column cannot be null'
        }
      },
      comment       :'This contains the unique identifiers for each record on this table'
    },

    citizen_ID: {
      type          :DataTypes.UUID,
      allowNull     :false,
      validations   : {
        notNull : {
          msg   :'This column cannot be null'
        }
      },
      comment       :'This column contains the id of the citizen'
    },

    temperature : {
      type          :DataTypes.FLOAT,
      allowNull     : false,
      comment       :'This contains the temperature of the citizen'
    },

    fever : {
      type          :DataTypes.BOOLEAN,
      allowNull     :false,
      comment       :'This indicates that if the user does have a fever'
    },

    dry_cough : {
      type          :DataTypes.BOOLEAN,
      allowNull     :false,
      comment       :'This indicates that if the user does have a dry cough'
    },

    sore_throat : {
      type          :DataTypes.BOOLEAN,
      allowNull     :false,
      comment       :'This indicates that if the user does have a sore throat'
    },

    breath_shortness : {
      type          :DataTypes.BOOLEAN,
      allowNull     :false,
      comment       :'This indicates that if the user does have a shortness in breath'
    },

    smell_taste_loss : {
      type          :DataTypes.BOOLEAN,
      allowNull     :false,
      comment       :'This indicates that if the user does have a loss of smell and taste'
    },

    fatigue : {
      type          :DataTypes.BOOLEAN,
      allowNull     :false,
      comment       :'This indicates that if the user does have a fatigue'
    },

    aches_pain : {
      type          :DataTypes.BOOLEAN,
      allowNull     :false,
      comment       :'This indicates that if the user does have an aches and pain'
    },

    runny_nose : {
      type          :DataTypes.BOOLEAN,
      allowNull     :false,
      comment       :'This indicates that if the user does have a runny nose'
    },

    diarrhea : {
      type          :DataTypes.BOOLEAN,
      allowNull     :false,
      comment       :'This indicates that if the user doess have a diarrhea'
    },

    headache : {
      type          :DataTypes.BOOLEAN,
      allowNull     :false,
      comment       :'This indicates that if the user does have a headache'
    },

    created_datetime : {
      type          :DataTypes.DATE,
      comment       :'This contains the date and time that a record had been created'
    },

    updated_datetime : {
      type          :DataTypes.DATE,
      comment       :'This contains the date and time that a record had been edited'
    },

  }, {

    // mdel options 

    sequelize,
    freezeTableName : true,
    modelName       : 'Health_Status_Logs',
    timestamps      : true,
    createdAt       : 'created_datetime',
    updatedAt       : 'updated_datetime',
  });
  return Health_Status_Logs;
};