'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class muthowif extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  muthowif.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    status: DataTypes.STRING,
    gender: DataTypes.STRING,
    dateOfBirthday: DataTypes.STRING,
    describeProfile: DataTypes.STRING,
    photoProfileUrl: DataTypes.STRING,
    backgroundUrl: DataTypes.STRING,
    ktpUrl: DataTypes.STRING,
    npwpUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'muthowif',
  });
  return muthowif;
};