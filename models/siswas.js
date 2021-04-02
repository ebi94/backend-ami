'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class siswas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  siswas.init({
    // id: DataTypes.STRING,
    nama: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    no_telp: DataTypes.STRING,
    alamat: DataTypes.STRING,
    created_at: DataTypes.STRING,
    updated_at: DataTypes.STRING
    
  }, {
    sequelize,
    modelName: 'siswas',
  });
  return siswas;
};