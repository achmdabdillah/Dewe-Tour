'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      trip.belongsTo(models.country, {
        as: "country",
        foreignKey: {
          name: "idCountry",
        },
      });

      trip.hasMany(models.transaction, {
        as: "transactions",
        foreignKey: {
          name: "idTrip",
        },
      });
    }
  };
  trip.init({
    title: DataTypes.STRING,
    idCountry: DataTypes.INTEGER,
    accomodation: DataTypes.STRING,
    transportation: DataTypes.STRING,
    eat: DataTypes.STRING,
    day: DataTypes.STRING,
    night: DataTypes.STRING,
    dateTrip: DataTypes.DATE,
    price: DataTypes.INTEGER,
    quota: DataTypes.INTEGER,
    quotaFilled: DataTypes.INTEGER,
    description: DataTypes.STRING,
    images: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'trip',
  });
  return trip;
};