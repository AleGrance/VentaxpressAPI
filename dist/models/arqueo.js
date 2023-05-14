"use strict";

module.exports = function (sequelize, DataTypes) {
  var Arqueo = sequelize.define('Arqueo', {
    id_arqueo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
  /**
   *  ASSOCIATIONS
   */

  Arqueo.associate = function (models) {
    //BELONGSTO
    // Caja
    Arqueo.belongsTo(models.Caja, {
      foreignKey: {
        name: 'id_caja',
        allowNull: false
      }
    }); // Billete

    Arqueo.belongsTo(models.Billete, {
      foreignKey: {
        name: 'id_billete',
        allowNull: false
      }
    }); // Usuario

    Arqueo.belongsTo(models.Users, {
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    });
  };

  return Arqueo;
};