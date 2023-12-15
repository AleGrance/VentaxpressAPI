module.exports = (sequelize, DataType) => {

    const Proveedor = sequelize.define('Proveedor', {
        id_proveedor: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nom_proveedor: {
            type: DataType.STRING,
            unique: {
                msg: 'El nombre ingresado ya existe!',
                fields: ['ruc_proveedor']
            },
            allowNull: false
        },
        ruc_proveedor: {
            type: DataType.STRING,
            allowNull: false,
            unique: {
                msg: 'El RUC ingresado ya existe!',
                fields: ['ruc_proveedor']
            },
        },
        timbrado_proveedor: {
            type: DataType.INTEGER,
            allowNull: false
        }
    }, { freezeTableName: true });

    Proveedor.associate = (models) => {
        // Articulo
        Proveedor.hasMany(models.Articulo, {
            foreignKey: {
                name: 'id_proveedor',
                allowNull: false
            }
        });

        // Cabecera_compra
        Proveedor.hasMany(models.Cabecera_compra, {
            foreignKey: {
                name: 'id_proveedor',
                allowNull: false
            }
        });
    };

    return Proveedor;
};