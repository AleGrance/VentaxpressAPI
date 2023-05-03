module.exports = (sequelize, DataTypes) => {
    const Cuenta_hijo = sequelize.define('Cuenta_hijo', {
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
        },
    });

    Cuenta_hijo.associate = (models) => {
        Cuenta_hijo.hasMany(models.Plan_de_cuenta);
    };

    return Cuenta_hijo;
};