"use strict";

module.exports = function (sequelize, DataType) {
  var Tasks = sequelize.define('Tasks', {
    task_id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    task_name: {
      type: DataType.STRING,
      allowNull: false
    },
    task_details: {
      type: DataType.STRING,
      allowNull: false
    },
    task_status: {
      type: DataType.STRING,
      allowNull: false
    },
    fecha_turno: {
      type: DataType.DATEONLY,
      allowNull: false
    },
    hora_turno: {
      type: DataType.TIME,
      allowNull: false
    },
    nro_cel: {
      type: DataType.STRING,
      allowNull: false
    },
    sanatorio: {
      type: DataType.STRING,
      allowNull: false
    }
  });
  /**
  * 
  *  ASSOCIATIONS BELONGSTO
  * 
  */

  Tasks.associate = function (models) {
    Tasks.belongsTo(models.Users, {
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    });
  };

  return Tasks;
};