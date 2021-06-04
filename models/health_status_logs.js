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
        foreignKey: 'citizen_ID',
        as: 'citizen',
        scope: {
          user_type: 'Citizen'
        },
        onDelete: 'RESTRICT'
      });

      // 1:M with [visiting_logs]
      this.hasMany(models.Visiting_Logs, {
        foreignKey: 'health_status_log_ID',
        as: 'visiting_logs',
        onDelete: 'RESTRICT'
      })
    }
  };

  Health_Status_Logs.init({

    //model attributes

    health_status_log_ID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      comment: 'This contains the unique identifiers for each record on this table'
    },

    citizen_ID: {
      type: DataTypes.UUID,
      allowNull: false,
      validations: {
        isUUID: {
          args: 4,
          msg: '[health_status_logs].[citizen_ID] value must be a UUIDV4 type'
        },
        notNull: {
          msg: '[health_status_logs].[citizen_ID] cannot be null'
        },
      },
      comment: 'This column contains the id of the citizen'
    },

    temperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[health_status_logs].[temperature] cannot be null'
        },
        isNumeric: {
          msg: '[health_status_logs].[temperature] only accepts numeric values'
        }
      },
      comment: 'This contains the current temperature of the citizen as enter on an establishment'
    },

    fever: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[health_status_logs].[fever] cannot be null'
        }
      },
      comment: 'This indicates that if the user does have a fever'
    },

    dry_cough: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[health_status_logs].[dry_cough] cannot be null'
        }
      },
      comment: 'This indicates that if the user does have a dry cough'
    },

    sore_throat: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[health_status_logs].[sore_throat] cannot be null'
        }
      },
      comment: 'This indicates that if the user does have a sore throat'
    },

    breath_shortness: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[health_status_logs].[breath_shortness] cannot be null'
        }
      },
      comment: 'This indicates that if the user does have a shortness in breath'
    },

    smell_taste_loss: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[health_status_logs].[smell_taste_loss] cannot be null'
        }
      },
      comment: 'This indicates that if the user does have a loss of smell and taste'
    },

    fatigue: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[health_status_logs].[fatigue] cannot be null'
        }
      },
      comment: 'This indicates that if the user does have a fatigue'
    },

    aches_pain: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[health_status_logs].[aches_pain] cannot be null'
        }
      },
      comment: 'This indicates that if the user does have an aches and pain'
    },

    runny_nose: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[health_status_logs].[runny_nose] cannot be null'
        }
      },
      comment: 'This indicates that if the user does have a runny nose'
    },

    diarrhea: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[health_status_logs].[diarrhea] cannot be null'
        }
      },
      comment: 'This indicates that if the user doess have a diarrhea'
    },

    headache: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[health_status_logs].[headache] cannot be null'
        }
      },
      comment: 'This indicates that if the user does have a headache'
    },

  }, {

    // Model options 

    sequelize,
    freezeTableName: true,
    modelName: 'Health_Status_Logs',
    timestamps: true,
    createdAt: 'created_datetime',
    updatedAt: 'updated_datetime',

    hooks: {
      afterCreate: () => {
        if (process.env.ENABLE_MODEL_LOGS === 'true') {
          console.log('A new record has been added to table [health_status_logs]');
        }
      }
    }
  });

  return Health_Status_Logs;
};