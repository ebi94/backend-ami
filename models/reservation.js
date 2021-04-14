'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  reservation.init({
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    route: DataTypes.STRING,
    picTravel: DataTypes.STRING,
    muthowifId: DataTypes.STRING,
    travelId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'reservation',
  });
  return reservation;
};