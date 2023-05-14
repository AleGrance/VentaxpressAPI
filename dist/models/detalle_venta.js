"use strict";

module.exports = function (sequelize, DataTypes) {
  var Detalle_venta = sequelize.define('Detalle_venta', {
    id_detalle_venta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion_detalle_venta: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cant_item_detalle_venta: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subtotal_detalle_venta: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio_detalle_venta: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // Nro que se relaciona con la cabecera
    nro_factura_venta: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Detalle_venta;
};