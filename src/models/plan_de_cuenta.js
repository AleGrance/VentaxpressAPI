module.exports = (sequelize, DataTypes) => {
  const Plan_de_cuenta = sequelize.define('Plan_de_cuenta', {
    id_plan_de_cuentas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_plan_de_cuentas: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigo_plan_de_cuentas: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
  });

  Plan_de_cuenta.associate = (models) => {
    Plan_de_cuenta.belongsTo(models.Contribuyente);
    Plan_de_cuenta.belongsTo(models.Cuenta_madre);
    Plan_de_cuenta.belongsTo(models.Cuenta_hijo);
    Plan_de_cuenta.belongsTo(models.Cuenta_contable);

  };

  return Plan_de_cuenta;
};