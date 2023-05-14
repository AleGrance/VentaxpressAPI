"use strict";

module.exports = function (sequelize, DataTypes) {
  var Cuenta_hijo = sequelize.define('Cuenta_hijo', {
    id_cuenta_hijo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_cuenta_hijo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  });

  Cuenta_hijo.associate = function (models) {
    Cuenta_hijo.hasMany(models.Plan_de_cuenta);
  };

  return Cuenta_hijo;
};