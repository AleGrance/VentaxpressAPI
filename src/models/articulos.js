module.exports = (sequelize, DataTypes) => {
    const Articulo = sequelize.define('Articulo', {
        id_articulo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_articulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descri_articulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        costo_articulo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio_articulo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cant_disponible_articulo: {
            type: DataTypes.INTEGER,
            default: 1,
            allowNull: false
        }
    }, { freezeTableName: true });

    Articulo.associate = (models) => {
        Articulo.belongsTo(models.Proveedor, {
            foreignKey: {
                name: 'id_proveedor',
                default: 1,
                allowNull: false
            }
        });

        Articulo.belongsTo(models.Estado, {
            foreignKey: {
                name: 'id_estado',
                default: 1,
                allowNull: false
            }
        });
    };



    return Articulo;
};