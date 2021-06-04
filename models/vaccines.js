'use strict';
const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Vaccines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // 1:M with [vaccination_records]
      this.hasMany(models.Vaccination_Records, {
        foreignKey : 'vaccine_ID',
        as         : 'vaccination_records',
        onDelete   : 'RESTRICT'
      });

      // 1:M with [vaccination_appointments]
      this.hasMany(models.Vaccination_Appointments, {
        foreignKey : 'preferred_vaccine',
        as         : 'vaccination_appointments',
        onDelete   : 'RESTRICT'
      });
    }
  };

  Vaccines.init({

    // Model attributes

    vaccine_ID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
      comment: 'This contains the unique identifiers for each record on this table'
    },

    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[vaccines].[product_name] cannot be null'
        },
        notEmpty: {
          msg: '[vaccines].[product_name] cannot be blank or empty'
        }
      },
      comment: 'This column indicates the product name of the vaccine'
    },

    vaccine_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[vaccines].[vaccine_name] cannot be null'
        },
        notEmpty: {
          msg: '[vaccines].[vaccine_name] cannot be blank or empty'
        },
      },
      comment: 'This column indicates the general name of the vaccine'
    },

    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[vaccines].[type] cannot be null'
        },
        notEmpty: {
          msg: '[vaccines].[type] cannot be blank or empty'
        },
      },
      comment: 'This column indicates the type of vaccine'
    },

    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[vaccines].[manufacturer] cannot be null'
        },
        notEmpty: {
          msg: '[vaccines].[manufacturer] cannot be blank or empty'
        },
      },
      comment: 'In this column tells the name of the manufacturer'
    },

    shots_details: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[vaccines].[shots_details] cannot be null'
        },
        notEmpty: {
          msg: '[vaccines].[shots_details] cannot be blank or empty'
        },
      },
      comment: 'This column indicates the number of shots required'
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '[vaccines].[description] cannot be null'
        },
        notEmpty: {
          msg: '[vaccines].[description] cannot be blank or empty'
        },
      },
      comment: 'In this column tells the description of the vaccine'
    },

  }, {

    // Model options

    sequelize,
    freezeTableName: true,
    modelName: 'Vaccines',
    timestamps: true,
    createdAt: 'created_datetime',
    updatedAt: 'updated_datetime',

    hook: {
      afterCreate: () => {
        if(process.env.ENABLE_MODEL_LOGS === 'true') {
          console.log('A new record has been added to table [vaccines]');
        }
      }
    }
  });

  return Vaccines;
};