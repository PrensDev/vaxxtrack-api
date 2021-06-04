'use strict';
const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Quarantine_Information extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // 1:1 with [contacts]
      this.belongsTo(models.Contacts, {
        foreignKey : 'contact_ID',
        as         : 'quarantined_individual',
        onDelete   : 'RESTRICT'
      })
    }
  };

  Quarantine_Information.init({

    // Model attribute

    quarantine_ID: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      comment: 'This contains the unique identifiers for each record on this table'
    },

    contact_ID: {
      type: DataTypes.UUID,
      allowNull: false,
      validations: {
        notNull: {
          msg: '[quarantine_information].[contact_ID] cannot be null'
        },
        isUUID: {
          args: 4,
          msg: '[quarantine_information].[contact_ID] value must be a UUIDV4 type'
        },
      },
      comment: 'This links contacts to attach the contact information of the patient'
    },

    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validations: {
        isDate: {
          msg: '[quarantine_information].[start_date] value must be a valid date'
        },
        notNull: {
          msg: '[quarantine_information].[start_date] cannot be null'
        }
      },
      comment: 'This contains the date and time of the start of the quarantine'
    },

    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validations: {
        isDate: {
          msg: '[quarantine_information].[end_date] value must be a valid date'
        },
        notNull: {
          msg: '[quarantine_information].[end_date] cannot be null'
        }
      },
      comment: 'This contains the date and time of the start of the quarantine'
    },

    quarantine_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        isIn: {
          args: [['In-patient','Out-patient']],
          msg: '[quarantine_information].[quarantine_type] value must be `In-patient` or `Out-patient` only'
        },
        notNull: {
          msg: '[quarantine_information].[quarantine_type] cannot be null'
        }
      },
      comment: 'This indicates the patients quaratine status'
    },

  }, {

    // Model Options

    sequelize,
    freezeTableName: true,
    modelName: 'Quarantine_Information',
    timestamps: true,
    createdAt: 'created_datetime',
    updatedAt: 'updated_datetime',

    hooks: {
      afterCreate: () => {
        if(process.env.ENABLE_MODEL_LOGS === 'true') {
          console.log('A new record has been added to table [quarantine_information]');
        }
      }
    }
  });

  return Quarantine_Information;
};