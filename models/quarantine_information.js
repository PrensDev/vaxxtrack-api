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
        foreignKey: 'contact_ID',
        as: 'contact',
        onDelete: 'RESTRICT'
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
          msg: 'This conact ID cannot be null'
        },
        isUUID: 4,
      },
      comment: 'This links contacts to attach the contact information of the patient'
    },

    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validations: {
        isDate: {
          msg: 'Start date must have a valid value'
        },
        notNull: {
          msg: 'Start date cannot be null'
        }
      },
      comment: 'This contains the date and time of the start of the quarantine'
    },

    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validations: {
        isDate: {
          msg: 'End date must have a valid value'
        },
        notNull: {
          msg: 'End date cannot be null'
        }
      },
      comment: 'This contains the date and time of the start of the quarantine'
    },

    quarantine_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        isIn: {
          args: [
            [
              'In-patients',
              'out-patient',
            ]
          ],
          msg: 'Invalid input is detected for the result'
        },
        notNull: {
          msg: 'Quarantine type cannot be null'
        }
      },
      comment: 'this indicates the patients quaratine status'
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
        console.log('A new record has been added to table [quarantine_information]');
      }
    }
  });

  return Quarantine_Information;
};