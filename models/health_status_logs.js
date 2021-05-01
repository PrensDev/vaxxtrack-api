'use strict';

const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Health_Status_Logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      // M:1 with [users]
      this.belongsTo(models.Users, {
        foreignKey  : 'citizen_ID',
        as          : 'users',
        onDelete    : 'RESTRICT'
      });

      // 1:M with [visiting_logs]
      this.hasMany(models.Visiting_Logs, {
        foreignKey  : 'health_status_log_ID',
        as          : 'visiting_logs',
        onDelete    : 'RESTRICT'
      })
    }
  };

  Health_Status_Logs.init({

    //model attributes

    health_status_log_ID: {
      type          : DataTypes.UUID,
      primaryKey    : true,
      defaultValue  : Sequelize.UUIDV4,
      allowNull     : false,
      comment       :'This contains the unique identifiers for each record on this table'
    },

    citizen_ID: {
      type          : DataTypes.UUID,
      allowNull     : false,
      validations   : {
        notNull : {
          msg   :'This column cannot be null'
        }
      },
      comment       :'This column contains the id of the citizen'
    },

    temperature: {
      type          : DataTypes.FLOAT,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'Temperature cannot be null'
        }
      },
      comment       : 'This contains the current temperature of the citizen as enter on an establishment'
    },

    fever: {
      type          : DataTypes.BOOLEAN,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'Fever cannot be null'
        }
      },
      comment       : 'This indicates that if the user does have a fever'
    },

    dry_cough: {
      type          : DataTypes.BOOLEAN,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'Dry cough cannot be null'
        }
      },
      comment       : 'This indicates that if the user does have a dry cough'
    },

    sore_throat: {
      type          : DataTypes.BOOLEAN,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'Sore throat cannot be null'
        }
      },
      comment       : 'This indicates that if the user does have a sore throat'
    },

    breath_shortness: {
      type          : DataTypes.BOOLEAN,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'Breath shortness cannot be null'
        }
      },
      comment       : 'This indicates that if the user does have a shortness in breath'
    },

    smell_taste_loss: {
      type          : DataTypes.BOOLEAN,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'Loss of smell and taste cannot be null'
        }
      },
      comment       : 'This indicates that if the user does have a loss of smell and taste'
    },

    fatigue: {
      type          : DataTypes.BOOLEAN,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'Fatigue cannot be null'
        }
      },
      comment       : 'This indicates that if the user does have a fatigue'
    },

    aches_pain: {
      type          : DataTypes.BOOLEAN,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'Aches and Pain cannot be null'
        }
      },
      comment       : 'This indicates that if the user does have an aches and pain'
    },

    runny_nose: {
      type          : DataTypes.BOOLEAN,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'Runny Nose cannot be null'
        }
      },
      comment       : 'This indicates that if the user does have a runny nose'
    },

    diarrhea: {
      type          : DataTypes.BOOLEAN,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'Diarrhea cannot be null'
        }
      },
      comment       : 'This indicates that if the user doess have a diarrhea'
    },

    headache: {
      type          : DataTypes.BOOLEAN,
      allowNull     : false,
      validate      : {
        notNull: {
          msg: 'Headache cannot be null'
        }
      },
      comment       : 'This indicates that if the user does have a headache'
    },

  }, {

    // Model options 

    sequelize,
    freezeTableName : true,
    modelName       : 'Health_Status_Logs',
    timestamps      : true,
    createdAt       : 'created_datetime',
    updatedAt       : 'updated_datetime',

    hooks: {
      afterCreate: () => {
        console.log('A new record has been added to table [health_status_logs]');
      }
    }
  });

  return Health_Status_Logs;
};