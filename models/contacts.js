'use strict';
const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Contacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // M:1 with [case_information]
      this.belongsTo(models.Case_Information, {
        foreignKey: 'case_ID',
        as: 'case_information',
        onDelete: 'RESTRICT'
      });

      // 1:1 with [quarantine_information]
      this.hasOne(models.Quarantine_Information, {
        foreignKey: 'contact_ID',
        as: 'quarantine_information',
        onDelete: 'RESTRICT'
      });
    }
  };

  Contacts.init({

    // Model attributes

    contact_ID: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      comment: 'This contains the unique identifiers for each record on this table'
    },

    case_ID: {
      type: DataTypes.UUID,
      allowNull: false,
      validations: {
        isUUID: {
          args: 4,
          msg: '[contacts].[case_ID] value must be a UUIDV4 type'
        },
        notNull: {
          msg: '[contacts].[case_ID] cannot be null'
        }
      },
      comment: 'This contains the case information ID to identify the user'
    },

    citizen_ID: {
      type: DataTypes.UUID,
      allowNull: true,
      validations: {
        isUUID: {
          msg: '[contacts].[citizen_ID] value must be a UUIDV4 type'
        }
      },
      comment: 'This contains the citizen\'s ID indicating that he/she was with contact to a person positive with COVID-19'
    }

  }, {

    // Model Options

    sequelize,
    freezeTableName: true,
    modelName: 'Contacts',
    timestamp: true,
    createdAt: 'created_datetime',
    updatedAt: 'updated_datetime',

    hooks: {
      afterCreate: () => {
        if (process.env.ENABLE_MODEL_LOGS === 'true') {
          console.log('A new record has been added to table [contacts]')
        }
      }
    }
  });

  return Contacts;
};