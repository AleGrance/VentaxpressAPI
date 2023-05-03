module.exports = (sequelize, DataTypes) => {
    const Cabecera_venta = sequelize.define('Cabecera_venta', {
        id_cabecera_venta: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nro_factura_venta: {
            type: DataTypes.STRING,
            unique: {
                msg: 'El nro de factura ingresado ya existe!',
                fields: ['nro_factura_compra']
            },
            allowNull: false
        },
        condicion_venta_venta: {
            type: DataTypes.STRING,
            allowNull: false
        },
        total_venta: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha_factura_venta: {
            type: DataTypes.DATEONLY,
            allowNull: true
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
        }
    });

    Cabecera_venta.associate = (models) => {
        Cabecera_venta.belongsTo(models.Cliente);
        Cabecera_venta.belongsTo(models.Contribuyente);
    };
    return Cabecera_venta;
};