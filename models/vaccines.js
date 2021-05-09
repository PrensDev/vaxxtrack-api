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

      // 1:M with [vaccination_appointments]
      this.hasMany(models.Vaccination_Appointments, {
        foreignKey: 'preferred_vaccine',
        as: 'vaccination_appointment',
        onDelete: 'RESTRICT'
      });
    }
  };

  Vaccines.init({

    // Model attributes

    vaccine_ID: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDv4,
      primaryKey: true,
      comment: 'This contains the unique identifiers for each record on this table'
    },

    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'In this column tells the name of the vaccine'
    },

    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'In this column tells the name of the manufacturer'
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
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