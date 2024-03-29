module.exports = (sequelize, DataTypes) => {
    const Cabecera_compra = sequelize.define('Cabecera_compra', {
        id_cabecera_compra: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nro_factura_compra: {
            type: DataTypes.STRING,
            unique: {
                msg: 'El nro de factura ingresado ya existe!',
                fields: ['nro_factura_compra']
            },
            allowNull: false
        },
        condicion_venta_compra: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        total_compra: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha_factura_compra: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        monto_gravado_10: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        iva_10: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        monto_gravado_5: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        iva_5: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        exento: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, { freezeTableName: true });

    Cabecera_compra.associate = (models) => {
        Cabecera_compra.belongsTo(models.Proveedor, {
            foreignKey: {
                name: 'id_proveedor',
                default: 1,
                allowNull: false
            }
        });

        Cabecera_compra.belongsTo(models.Contribuyente, {
            foreignKey: {
                name: 'id_contribuyente',
                default: 1,
                allowNull: false
            }
        });
    };

    return Cabecera_compra;
};