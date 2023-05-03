module.exports = (sequelize, DataTypes) => {
  const Cuenta_contable = sequelize.define('Cuenta_contable', {
    id_cuenta_contable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_cuenta_contable: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
  });

  Cuenta_contable.associate = (models) => {
    Cuenta_contable.hasMany(models.Plan_de_cuenta);
  };

  return Cuenta_contable;
};