module.exports = (sequelize, DataTypes) => {
    const Estado = sequelize.define('Estado', {
        id_estado: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        descripcion_estado: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { freezeTableName: true });

    /**
     * 
     *  ASSOCIATIONS
     * 
     */
    Estado.associate = (models) => {
        // Caja
        Estado.hasMany(models.Caja, {
            foreignKey: {
                name: 'id_estado',
                allowNull: false
            }
        });

        // Articulo
        Estado.hasMany(models.Articulo, {
            foreignKey: {
                name: 'id_estado',
                allowNull: false
            }
        });

    };

    return Estado;
};