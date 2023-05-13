module.exports = (sequelize, DataTypes) => {
    const Billete = sequelize.define('Billete', {
        id_billete: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        denominacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        valor: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });

    /**
     * 
     *  ASSOCIATIONS
     * 
     */

    Billete.associate = (models) => {
        // HASMANY
        // Arqueo
        Billete.hasMany(models.Arqueo, {
            foreignKey: {
                name: 'id_billete',
                allowNull: false
            }
        });
    };

    return Billete;
};