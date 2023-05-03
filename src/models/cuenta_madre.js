module.exports = (sequelize, DataTypes) => {
    const Cuenta_madre = sequelize.define('Cuenta_madre', {
        id_cuenta_madre: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_cuenta_madre: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
    });

    Cuenta_madre.associate = (models) => {
        Cuenta_madre.hasMany(models.Plan_de_cuenta);
    };

    return Cuenta_madre;
};